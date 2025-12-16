import { Router } from "express";
import {
  listUsersController,
  showMeUserController,
  uploadImageController,
} from "../controllers/private.js";
import { upload } from "../config/multer.js";

const router = Router();

router.get("/listar-usuarios", listUsersController);

router.get("/me", showMeUserController);

router.post('/profile', upload.single('image') ,uploadImageController);

export default router;
