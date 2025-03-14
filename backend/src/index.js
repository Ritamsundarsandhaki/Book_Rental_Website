import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./lib/db.js";
import userRouter from "./routes/user.routes.js";
import ShopkeeperRouter from "./routes/shopkeeper.routes.js";
import  HomeRouter from "./routes/open.routes.js";
import morgan from 'morgan'



const app = express();
app.use(
  cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
);
app.use(morgan("dev"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use("/api",HomeRouter);
app.use("/api/user", userRouter);
app.use("/api/shopkeeper", ShopkeeperRouter);


app.use((err, req, res, next) => {
  console.log(err.stack);
  const StatusCode = err.statusCode || 500;
  res.status(StatusCode).json({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server started at ${PORT} `);
  connectDb();
});
