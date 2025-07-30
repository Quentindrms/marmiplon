import { Router } from "express";
import index from "./index";
import { GlobalController } from "../controllers/globalController";
import { request } from "node:http";

const globalRouter = Router();

globalRouter.get("/", (request, response) => {
   const globalController = new GlobalController(request, response);
   globalController.homepage();
})

globalRouter.get('/categories', (request, response) => {
      const globalController = new GlobalController(request, response);
      globalController.categories();
})

export default globalRouter;