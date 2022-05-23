//Import the user from schema
import User from "../models/User.js";
//Importing the bcryptjs to encrypt the password of users
import bcrypt from "bcryptjs";
//Importing error
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    //Establishing encryption using bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //Adding Parameters to add new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    //Finding the username and its components
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return next(createError(404, "User Not Found!"));
    //This is to compare the password that has been hashed, documentation in bcryptjs npm
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //Response to the compared password
    if (!passwordCheck)
      return next(createError(400, "Wrong Password or Username!"));

    //To prevent the password from sending to the front end we restructure the api and what gets sent
    const { password, isAdmin, ...otherDetails } = user._doc; // This setup hid password, isAdmin from api call in other details. Had to = user._doc so it brings only that up with the items hidden
    res.status(200).json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
