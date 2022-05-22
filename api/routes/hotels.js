import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/hotelController.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();
//Create the api calls

//Create
router.post("/", createHotel);
//Update
router.put("/:id", updateHotel);
//Delete
router.delete("/:id", deleteHotel);
//Get
router.get("/:id", getHotel);
//Get All
router.get("/", getAllHotels);

//Exporting the router function for hotels
export default router;
