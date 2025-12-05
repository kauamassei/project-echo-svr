import { Router } from "express";
import { listUsersController, showMeUserController } from "../controllers/private.js";

const router = Router();

router.get("/listar-usuarios", listUsersController);

router.get("/me", showMeUserController);

export default router;
