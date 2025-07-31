import { Router } from "express";
import globalRouter from "./globalRouter";
import recipeDetails from "./recipeDetails";

// Initialiastion du router Express
const router = Router();

router.use(globalRouter);
router.use(recipeDetails)

export default router;