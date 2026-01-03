import { Router } from "express";
import trainingController from "../controllers/training.controller.js";

const router = Router();

router.post("/", trainingController.create);
router.get("/", trainingController.list);
router.delete("/:id", trainingController.remove);

export default router;
