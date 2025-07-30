import globalRouter from "./globalRouter";
import express, { Router } from "express";
import categoryRouter from "./categoryRouter";

const PORT = 3004;

//Initialization du router express

const router = express();

//déclaration de la route home

router.get('/', (request, response) => {
  response.send("Bienvenue sur Marmiplon !");
  });

router.get('/recherche', (request, response) => {
  response.send("Bienvenue sur recherche !");
  });

router.use(categoryRouter);

export default router;