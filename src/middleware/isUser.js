import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

dotenv.config();

export const isUser = async (req, res, next) => {
  try {
    const reqheaders = req.headers.authorization;

    const token = reqheaders && reqheaders.split(" ")[1];

    if (!token) {
      return res.status(400).json("No token");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.find({ _id: decode.id });

    if (!user) {
      return res.status(404).json("Invalid Request");
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
