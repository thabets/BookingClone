//Establishing Variable
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

dotenv.config();
const app = express();

//Establishing Connection with MongoDB server using Mongoose
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongo DB");
  } catch (error) {
    throw error;
  }
};

//Running connection check
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

//Middlewares
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//This is to identify that if anything goes wrong within the middle ware this error is returned.
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//Actual connection
app.listen(3000, () => {
  connect();
  console.log("Connected to Backend!");
});
