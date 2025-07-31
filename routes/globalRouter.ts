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

globalRouter.get('/404', (request, response) => {
      const globalController = new GlobalController(request, response);
      globalController.error_404();
})

globalRouter.get('/418', (request, response) => {
      const globalController = new GlobalController(request, response);
      globalController.error_418();
})

export default globalRouter;