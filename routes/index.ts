import { Router } from "express";
import globalRouter from "./globalRouter";

// Initialiastion du router Express
const router = Router();

router.use(globalRouter);

export default router;