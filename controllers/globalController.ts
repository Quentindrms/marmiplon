import { Request, Response} from "express";
import { recipes, recipeIngredients, recipeInstructions, recipeComments, ingredients} from "./../src/data/data";
export class GlobalController { 
    protected request : Request; 
    protected response: Response;

    constructor(request: Request, response: Response){
        this.request = request; 
        this.response = response; 
    }

    public homepage(){
        this.response.render('./homepage'); 
         recipes
        recipeIngredients
        recipeInstructions
        recipeComments
ingredients
}

    public categories(){
        this.response.render('./categories'); 
    }

    public browseCategorie() {
        this.response.send('./categorie');
    }

    public browseRecette() {
        this.response.send('./recettes');
    }

    public error_404(){
        this.response.render('../errors/404');
    }

    public error_418(){
        this.response.render('../errors/418'); 
    }


}


