import { request, response, Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const categoryRouter: Router = Router();

categoryRouter.get("/categories", (request, response) => {
    const category: CategoryController = new CategoryController(request, response);
    category.getAllCategories();
});

categoryRouter.get("/categories/:cat", (request, response) => {
    const category: CategoryController = new CategoryController(request, response);
    category.getCategoryById();
});

export default categoryRouter;