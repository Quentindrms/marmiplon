import globalRouter from "./globalRouter";
import express, { Router } from "express";
import categoryRouter from "./categoryRouter";
import recipeDetails from "./recipeDetails";


const router = Router();

router.use(globalRouter);
router.use(recipeDetails)

//Initialization du router express


//déclaration de la route home

router.get('/', (request, response) => {
  response.send("Bienvenue sur Marmiplon !");
  });

router.get('/recherche', (request, response) => {
  response.send("Bienvenue sur recherche !");
  });

router.use(categoryRouter);

export default router;