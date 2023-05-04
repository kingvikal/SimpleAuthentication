import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/taskController.js";
import { isTeacher } from "../middleware/isTeacher.js";
import { isUser } from "../middleware/isUser.js";

const router = Router();

router.post("/createTask", isUser, isTeacher, createTask);
router.get("/getAllTask",isUser, getAllTask);
router.get("/getTaskById/:id",isUser, getTaskById);
router.put("/updateTask/:id",isUser, isTeacher, updateTask);
router.delete("/deleteTask/:id",isUser, isTeacher, deleteTask);

export default router;
