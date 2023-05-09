import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/mail.service.js";
import { authSchema } from "../middleware/joiValidation.js";
// import cookieParser from "cookie-parser";

dotenv.config();

export const register = async (req, res) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    if (!result) {
      res.status(404).send(error);
    } else {
      const user = await userModel.findOne({ email: result.email });

      if (user) {
        return res.status(400).json("Email already exists");
      }

      const makeUser = new userModel(result);
      const success = await makeUser.save();
      return res.status(200).json({ success });
    }
  } catch (err) {
    if (err.isJoi === true) {
      return res.status(422).json(err);
    }
    return res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json("No user with entered email exists");
    }
    if (email && password) {
      const payload = { id: user._id, email: user.email };
      const option = { expiresIn: "1d" };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, option);
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: 86400,
      });

      const compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        return res.status(404).json({ message: "Password doesn't match" });
      } else {
        return res
          .status(200)
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "None",
          })
          .header("Authorization", accessToken)
          .json({
            message: "Login Successful",
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
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
    return res.status(200).json({ message: "Update Successful", user });
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
