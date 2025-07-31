import { Request,Response } from "express";
import {ingredients} from "./../src/data/data";


export class RecipeController{

    protected request : Request;
    protected response: Response;

constructor(request: Request, response:Response){
    this.request=request;
    this.response=response;
}


public readrecipe (){
ingredients

 const requestedId = this.request.params.id;

 const ingredientsList = ingredients.find((ingredien) => {
      return ingredien.id == parseInt(requestedId);

   
    });
    if (!ingredientsList) {
        this.response.render("pages/book.ejs"), {

        }
    }
}}

// export const ingredients
// recipeIngredients
// recipeInstructions
// recipes