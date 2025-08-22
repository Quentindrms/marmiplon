import { Request,Response } from "express";
import { recipes, recipeIngredients, recipeInstructions, recipeComments, ingredients, categories} from "./../src/data/data";
import RecipeVerification from "../libs/RecipeVerification";


export class RecipeController{

    protected request : Request;
    protected response: Response;

constructor(request: Request, response:Response){
    this.request=request;
    this.response=response;
}


public readrecipe() {
    const requestedId = parseInt(this.request.params.id);

const recipe = recipes.find(recipe => recipe.id === requestedId);


    if (!recipe) {
    return this.response.status(404).render("../errors/404", {
        
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
        this.response.render("addRecipePage", {categories, ingredients, errors: {}});
    }

    public addRecipe(){
        const result = this.request.body;

        const errors = this.resultVerification(result)
        if(Object.keys(errors).length !== 0){
            this.response.render("addRecipePage", {categories, ingredients, errors});
            return;
        }

        this.cleanResultData(result);

        this.insertIntoData(result);

        this.response.redirect("/categories");
    }

    private resultVerification(result): object{
        const errors = {};
        if(RecipeVerification.isNotValidString(result.recipeTitle)){
            errors["title"] = "Le titre ne doit pas être vide";
        }

        if(RecipeVerification.isNotValidString(result.recipeDescription)){
            errors["desc"] = "La description ne doit pas être vide";
        }

        if(RecipeVerification.isNotValidCategory(result.recipeCategory)){
            errors["category"] = "Une catégorie doit être sélectionnée";
        }

        if(RecipeVerification.isNotValidIngredientName(result.recipeIngredientsName)){
            errors["ingredient"] = "Tous les champs des ingrédients doivent être remplis";
        }

        if(RecipeVerification.isNotValidIngredientQuantity(result.recipeIngredientsQuantity)){
            errors["ingredient"] = "Tous les champs des ingrédients doivent être remplis";
        }

        if(RecipeVerification.isNotValidStringArray(result.recipeIngredientsUnit)){
            errors["ingredient"] = "Tous les champs des ingrédients doivent être remplis";
        }

        if(RecipeVerification.isNotValidStringArray(result.recipeStep)){
            errors["step"] = "Toutes les étapes doivent être remplies";
        }

        return errors;
    }

    private cleanResultData(result){
        if(typeof result.recipeIngredientsName === "string"){
            result.recipeIngredientsName = [result.recipeIngredientsName];
        }
        
        if(typeof result.recipeIngredientsQuantity === "string"){
            result.recipeIngredientsQuantity = [result.recipeIngredientsQuantity];
        }

        if(typeof result.recipeIngredientsUnit === "string"){
            result.recipeIngredientsUnit = [result.recipeIngredientsUnit];
        }

        if(typeof result.recipeStep === "string"){
            result.recipeStep = [result.recipeStep];
        }
    }

    private insertIntoData(result){
        const catId: number | undefined = categories.find((cat) => {
            return cat.name == result.recipeCategory;
        })?.id;

        let recipeId: number | undefined = recipes.reverse().find((recipe) => {
            return Math.round(recipe.id / 100) === catId;
        })?.id;
        recipes.reverse();

        if(recipeId){
            recipeId++;
            recipes.push({ 
                id : recipeId,
                title: result.recipeTitle,
                description: result.recipeDescription,
                image: `https://placehold.co/600x400/orange/white?text=${result.recipeTitle.replaceAll(" ", "+")}`
            });

            let curStep: number = 1;
            let curId: number = recipeInstructions[recipeInstructions.length -1].id + 1;
            
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


            curId = recipeIngredients[recipeIngredients.length -1].id + 1;
            result.recipeIngredientsName.forEach((ingredientName, index) => {
                const ingredientUnit: string = result.recipeIngredientsUnit[index];
                const ingredientQuantity: number = result.recipeIngredientsQuantity[index] as number;

                const ingredId: number | undefined = ingredients.find((ingredient) => {
                    return ingredient.name === ingredientName;
                })?.id;

                if(ingredId){
                    recipeIngredients.push({
                        id: curId,
                        ingredientId: ingredId,
                        quantity: ingredientQuantity,
                        recipeId: recipeId as number,
                        unit: ingredientUnit
                    });
                    curId++;
                }
            });
        }
    }
}