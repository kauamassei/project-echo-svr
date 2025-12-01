import { Router } from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/public.js";

const router = Router();

router.post("/cadastro", createUserController);

router.post("/login", loginUserController);

export default router;
