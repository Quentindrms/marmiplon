import { Router } from "express";
import index from "./index";
import { GlobalController } from "../controllers/globalController";

const globalRouter = Router();

globalRouter.get("/", (request, response) => {
   const globalController = new GlobalController(request, response);
   globalController.homepage();
})

export default globalRouter;