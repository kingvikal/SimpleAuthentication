import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/mail.service.js";

dotenv.config();

export const register = async (req, res) => {
  const { firstName, lastName, email, Age, City, userType, password } =
    req.body;

  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(404).send(error);
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await userModel.findOne({ email });

      if (user) {
        return res.status(400).json("Email already exists");
      }

      const makeUser = new userModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        Age: Age,
        City: City,
        userType: userType,
        password: hashedPassword,
      });
      const success = await makeUser.save();
      return res.status(200).json({ success });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json("No user with entered email exists");
    } else {
      const payload = { id: user._id, email: user.email };
      const option = { expiresIn: "1d" };
      const token = jwt.sign(payload, process.env.JWT_SECRET, option);
      const compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        return res.status(404).json({ message: "Password doesn't match" });
      } else {
        return res
          .status(200)
          .json({ message: "logged in successfully", token: token });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await userModel.find();

    if (users) {
      return res.status(200).json({ message: "Success", data: users });
    } else {
      return res.status(400).json([]);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await userModel.findByIdAndUpdate(id, {
      email: email,
      password: hashedPassword,
    });
    return res.status(200).json({ message: "Update Successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ message: "No user" });
    } else {
      return res.status(200).json({ message: "Successfully deleted" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else {
      const token = jwt.sign({ _id: payload }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });

      await sendMail(email, token, req.headers.host).then((done) => {
        if (done) {
          console.log("host", req.headers.host);
          return res.send("Reset link has been send, Check Email");
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.params;

    const newhashedPassword = bcrypt.hashSync(newPassword, 10);

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Password must match" });
    }
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);

    if (!isVerified) {
      res.send("Token not verified");
    } else {
      var user = await userModel.findOne({ _id: isVerified });

      user.password = newhashedPassword;
      await user.save();
      res.send(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
