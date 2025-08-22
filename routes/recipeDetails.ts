import { Router } from "express";
import { RecipeController } from "../controllers/RecipeControllers";

const recipeDetails = Router();        //Initialisation Router

recipeDetails.get("/recipe/add", (request, response) => {
    const controller = new RecipeController(request,response);
    controller.addRecipePage();
});

recipeDetails.get("/recipe/:id", (request, response) => {
const controller = new RecipeController(request,response);
controller.readrecipe();
});

recipeDetails.post("/recipe/add", (request, response) => {
    const controller = new RecipeController(request,response);
    controller.addRecipe();
});


export default recipeDetails;


