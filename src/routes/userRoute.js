import { Router } from "express";
import {
  deleteUser,
  forgetPassword,
  getAll,
  getById,
  login,
  register,
  resetPassword,
  updateUser,
} from "../controllers/userController.js";
import { validRegister } from "../middleware/userValidation.js";
import { isUser } from "../middleware/isUser.js";

const router = Router();

router.post("/register", validRegister, register);
router.post("/login", login);
router.get("/getAll", isUser, getAll);
router.get("/getById/:id", isUser, getById);
router.put("/updateUser/:id", isUser, updateUser);
router.delete("/deleteUser/:id", isUser, deleteUser);
router.post("/forgetPassword", forgetPassword);
router.put("/resetPassword/:token", resetPassword);

export default router;
