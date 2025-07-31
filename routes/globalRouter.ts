import { Router } from "express";
import { GlobalController } from "../controllers/globalController";


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