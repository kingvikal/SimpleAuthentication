import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnect } from "./src/mongoDB/dbConnect.js";
import userRoute from "./src/routes/userRoute.js";
import classRoute from "./src/routes/classRoute.js";
import taskRoute from "./src/routes/taskRoute.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use(morgan("tiny"));

dbConnect();

app.use("/user", userRoute);
app.use("/task", taskRoute);
app.use("/class", classRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server is running at ${process.env.PORT}`)
);
