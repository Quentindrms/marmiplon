import globalRouter from "./globalRouter";
import express, { Router } from "express";
import recipeDetails from "./recipeDetails";


const router = Router();
const PORT = 3004;
router.use(globalRouter);
router.use(recipeDetails)

//Initialization du router express


//déclaration de la route home

router.get('/', (request, response) => {
  response.send("Bienvenue sur Marmiplon !");
  });

router.get('/categorie', (request, response) => {
  response.send("Bienvenue sur categorie !");
  });

router.get('/recherche', (request, response) => {
  response.send("Bienvenue sur recherche !");
  });

export default router;