import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["student", "teacher"],
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("UserModel", userModel);
