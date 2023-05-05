import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskModel",
      },
    ],
  },

  { timestamps: true }
);

userModel.pre("save", async function (next) {
  try {
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
    next()
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("UserModel", userModel);
