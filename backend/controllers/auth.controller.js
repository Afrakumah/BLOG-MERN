import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = asyncHandler(async (req, res, next) => {
  //console.log(req.body)
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({message: "All fields are required"})
    next(errorHandler(400, "All fields are required"));
  }

  //hashing password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  //storing new user's model in database
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.json("signup successful");
  next(error);
});

//signin function
export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  //checking email of user. using the user model and validating by email
  const validUser = await User.findOne({ email });
  if (!validUser) {
    return next(errorHandler(404, "invalid email or password"));
  }

  //checking password. comparesync fro bcrypt jelp to compare the pwd at pwd and validuser
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) {
    return next(errorHandler(404, "invalid email or password"));
  }

  //if both email and pwd are correct, user is authenticated using token
  const token = jwt.sign(
    {
      id: validUser._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "30" })

    //not showing password or hashed password
    const {password: pwd, ...rest} = validUser._doc;

    //adding token to the cookie
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
      // .json(validUser);
  
  next(error);
});
