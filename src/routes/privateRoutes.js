import { Router } from "express";
import {
  deleteMeUserController,
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

router.get("/favorites/agent", getFavoriteAgentController);

router.post("/profile", upload.single("image"), uploadImageController);

router.post("/favorites/agent", toggleFavoriteAgentController);

router.delete("/me", deleteMeUserController);



export default router;
