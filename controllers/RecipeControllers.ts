import { Request,Response } from "express";
import { recipes, recipeIngredients, recipeInstructions, recipeComments, ingredients, categories} from "./../src/data/data";


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

//instructions (étapes triées)
    const instructions = recipeInstructions
        .filter(instruction => instruction.recipeId === recipe.id)
        .sort((a, b) => a.step - b.step);

//  commentaires (triés croissant)
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
}

    public addRecipePage(){
        this.response.render("addRecipePage", {categories, ingredients});
    }

    public addRecipe(){
        const result = this.request.body;

        this.insertIntoData(result);

        this.response.redirect("/categories");
    }

    private insertIntoData(result){
        const catId: number | undefined = categories.find((cat) => {
            return cat.name == result.recipeCategory;
        })?.id;

        let recipeId: number | undefined = recipes.reverse().find((recipe) => {
            return Math.round(recipe.id / 100) === catId;
        })?.id;
        
        if(recipeId){
            recipeId++;
            recipes.push({ 
                id : recipeId,
                title: result.recipeTitle,
                description: result.recipeDescription 
            });

            console.log(recipes.find((recipe) => {
                return recipe.id === recipeId;
            }));

            let curStep = 1;
            let curId = recipeInstructions[recipeInstructions.length -1].id + 1;
            
            result.recipeStep.forEach(step => {
                recipeInstructions.push({
                    id: curId,
                    description: step,
                    step: curStep,
                    recipeId: recipeId as number
                });
                curStep++;
                curId++;
            });

            console.log(recipeInstructions);
        }
    }
}