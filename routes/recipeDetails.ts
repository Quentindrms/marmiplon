import { Router } from "express";
import { RecipeController } from "../controllers/RecipeControllers";

const recipeDetails = Router();        //Initialisation Router


recipeDetails.get("/recipe/:id", (request, response) => {
const controller = new RecipeController(request,response);
controller.readrecipe();
});


export default recipeDetails;


