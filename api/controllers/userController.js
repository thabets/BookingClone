//This is to create the User function that will be exported to the routes.

import User from "../models/User.js";
import { createError } from "../utils/error.js";

//We remove the create user because we already have the register function

//This is the update function to update a User
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//This is to delete User
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Has Been Deleted");
  } catch (err) {
    next(err);
  }
};

//This is to get by id
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//Get all Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
