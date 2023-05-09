import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnect } from "./src/mongoDB/dbConnect.js";
import userRoute from "./src/routes/userRoute.js";
import taskRoute from "./src/routes/taskRoute.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json());

app.use(morgan("tiny"));

dbConnect();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoute);
app.use("/task", taskRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server is running at ${process.env.PORT}`)
);
