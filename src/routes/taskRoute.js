import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/taskController.js";

const router = Router();

router.post("/createTask", createTask);
router.get("/getAllTask", getAllTask);
router.get("/getTaskById/:id", getTaskById);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTask);

export default router;
