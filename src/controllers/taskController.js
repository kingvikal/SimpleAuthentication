import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";

export const createTask = async (req, res) => {
  try {
    const { name, completed } = req.body;

    const newTask = new taskModel({
      name,
      completed,
    });
    const task = await newTask.save();
    const users = await userModel.find().populate("tasks");
    users.map(async (user) => {
      if (user.userType === "student") {
        user.tasks.push(task);
        await user.save();
      }
    });

    res.status(200).json({ message: "Task created Successfully", users });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getAllTask = async (req, res) => {
  try {
    const users = await taskModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findOne({
      _id: id,
    });
    if (!task || task.length == 0) {
      return res.status(400).json({ message: "No user by this ID" });
    }
    if (userType === "student") {
      return res.status(200).json(task);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { name, completed } = req.body;
    const { id } = req.params;

    const task = await taskModel.findByIdAndUpdate(id, {
      name,
      completed,
    });
    const userType = req.user.userType;
    if (userType === "teacher") {
      res.status(200).json({ message: "Task Updated Successfully", task });
    }
  } catch (err) {
    console.log(err);
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
