import { Router } from "express";
import { listUsersController } from "../controllers/private.js";

const router = Router();

router.get("/listar-usuarios", listUsersController);

export default router;
