import { Request,Response } from "express";
import { recipes, recipeIngredients, recipeInstructions, recipeComments, ingredients} from "./../src/data/data";


export class RecipeController{

    protected request : Request;
    protected response: Response;

constructor(request: Request, response:Response){
    this.request=request;
    this.response=response;
}


public readrecipe() {
    const requestedId = parseInt(this.request.params.id);
console.log(requestedId);
const recipe = recipes.find(recipe => recipe.id === requestedId);
console.log(recipe);

    if (!recipe) {
    return this.response.status(404).render("recipePage", {
        message: "Recette introuvable"
    });
}

    // On récupère les ingrédients liés à cette recette
    const recipeIngs = recipeIngredients
        .filter(recipeIngredient => recipeIngredient.recipeId === recipe.id)
        .map(recipeIngredient => {
            const ingredient = ingredients.find(i => i.id === recipeIngredient.ingredientId);
            return {
                name: ingredient?.name,
                quantity: recipeIngredient.quantity,
                unit: recipeIngredient.unit
            };
        });

//Instructions (étapes triées)
    const instructions = recipeInstructions
        .filter(instruction => instruction.recipeId === recipe.id)
        .sort((a, b) => a.step - b.step);

    //  Commentaires (triés croissant)
    const comments = recipeComments
        .filter(comment => comment.recipeId === recipe.id)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    //  recup data
    this.response.render("recipePage", {
        recipe,
        ingredients: recipeIngs,
        instructions,
        comments
    });
}}