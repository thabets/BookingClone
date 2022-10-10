import mongoose from "mongoose";
const { Schema } = mongoose;

//Creating the hotel schema for mongoose

const HotelSchema = new mongoose.Schema({
//Hotel name and type
  name: {
    type: String,
    required: true,
  },
  //Different hosting description such as Hotel, Cabin, Apartment etc...
  type: {
    type: String,
    required: true,
  },
  // Location City of Hotel
  city: {
    type: String,
    required: true,
  },
  // Address 
  address: {
    type: String,
    required: true,
  },
  //Distance of hotel
  distance: {
    type: String,
    required: true
  },
  //Array of Images in a string
  photos: {
    type: [String],
  },
  //Hotel Description
  description: {
    type: String,
    required: true,
  },
  //Location rating iin a 5 star rating
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  //This is a room id that will be a model of room.js
  rooms: {
    type: [String],
  },
  // Hotel prices and their 
  cheapestPrice: {
    type: Number,
    required: true,
  },
  //This is to show some featured hotels
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", HotelSchema);
