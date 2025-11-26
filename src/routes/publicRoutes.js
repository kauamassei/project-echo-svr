import { Router } from "express";
import { createUserController, loginUserController } from "../controllers/public";

const router = Router()


router.post('/cadastro', createUserController)

router.post('/login', loginUserController)

