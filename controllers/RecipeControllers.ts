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
        this.response.render("addRecipePage", {categories, ingredients});
    }

    public addRecipe(){
        const result = this.request.body;

        if(!this.resultValidator(result)){
            this.response.render("addRecipePage", {categories, ingredients});
            return;
        }

        this.insertIntoData(result);

        this.response.redirect("/categories");
    }

    private resultValidator(result): boolean{
        if(!result.recipeTitle || (typeof result.recipeTitle === "string" && result.recipeTitle === "")){
            return false;
        }

        if(!result.recipeDescription || (typeof result.recipeDescription === "string" && result.recipeDescription === "")){
            return false;
        }

        if(!result.recipeCategory || (typeof result.recipeCategory === "string" && categories.find(category => { return category.name === result.recipeCategory }) === undefined)){
            return false;
        }

        if(!result.recipeIngredientsName){
            return false;
        }
        if(typeof result.recipeIngredientsName === "string"){
            result.recipeIngredientsName = [result.recipeIngredientsName];
        }
        for (const name of result.recipeIngredientsName) {
            if(ingredients.find(ingredient => { return ingredient.name === name }) === undefined){
                return false;
            }
        }

        if(!result.recipeIngredientsQuantity){
            return false;
        }
        if(typeof result.recipeIngredientsQuantity === "string"){
            result.recipeIngredientsQuantity = [result.recipeIngredientsQuantity];
        }
        for (const quantity of result.recipeIngredientsQuantity) {
            if (!/^[0-9.]+$/.test(quantity)) {
                return false;
            }
        }

        if(!result.recipeIngredientsUnit){
            return false;
        }
        if(typeof result.recipeIngredientsUnit === "string"){
            result.recipeIngredientsUnit = [result.recipeIngredientsUnit];
        }
        for (const unit of result.recipeIngredientsUnit) {
            if(unit === ""){
                return false;
            }
        }

        if(!result.recipeStep){
            return false;
        }
        if(typeof result.recipeStep === "string"){
            result.recipeStep = [result.recipeStep];
        }
        for (const step of result.recipeStep) {
            if(step === ""){
                return false;
            }
        }

        return true;
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
                description: result.recipeDescription 
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