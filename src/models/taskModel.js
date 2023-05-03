import mongoose from "mongoose";

const taskModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    taskEnum: {
      type: String,
      enum: ["student", "teacher"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("TaskModel", taskModel);
