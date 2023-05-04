import mongoose from "mongoose";

const taskModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    

  },
  { timestamps: true }
);

export default mongoose.model("TaskModel", taskModel);
