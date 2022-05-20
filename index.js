//Establishing Variable
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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



//Actual connection
app.listen(3000, () => {
  connect();
  console.log("Connected to Backend!");
});
