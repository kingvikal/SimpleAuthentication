import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";

export const createTask = async (req, res) => {
  try {
    const { name } = req.body;

    const newTask = new taskModel({
      name,
    });
    const task = await newTask.save();
    res.status(200).json({ message: "Task created Successfully", task });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getAllTask = async (req, res) => {
  try {
    const task = await taskModel.find();
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const task = await taskModel.findByIdAndUpdate(id, {
      name,
    });
    res.status(200).json({ message: "Task Updated Successfully", task });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json("User not found");
    }
    res.status(200).json({ message: "Deleted Successfully", task });
  } catch {
    res.status(500).json("Something went wrong");
  }
};
