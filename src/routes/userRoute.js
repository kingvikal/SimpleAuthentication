import { Router } from "express";
import {
  deleteUser,
  forgetPassword,
  getAll,
  getById,
  login,
  refreshToken,
  register,
  resetPassword,
  updateUser,
} from "../controllers/userController.js";
import { isUser } from "../middleware/isUser.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/getAll", isUser, getAll);
router.get("/getById/:id", isUser, getById);
router.put("/updateUser/:id", isUser, updateUser);
router.delete("/deleteUser/:id", isUser, deleteUser);
router.post("/forgetPassword", isUser, forgetPassword);
router.put("/resetPassword/:token", isUser, resetPassword);

export default router;
