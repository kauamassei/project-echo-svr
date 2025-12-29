import { Router } from "express";
import {
  getFavoriteAgentController,
  listUsersController,
  showMeUserController,
  toggleFavoriteAgentController,
  uploadImageController,
} from "../controllers/private.js";
import { upload } from "../config/multer.js";

const router = Router();

router.get("/listar-usuarios", listUsersController);

router.get("/me", showMeUserController);

router.post('/profile', upload.single('image') ,uploadImageController);

router.post('/favorites/agent', toggleFavoriteAgentController);

router.get('/favorites/agent', getFavoriteAgentController);

export default router;
