import { Router } from "express";
import { listUsersController } from "../controllers/private";

const router = Router();

router.get("/listar-usuarios", listUsersController);
