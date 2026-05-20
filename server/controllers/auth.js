import UserDetails from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/errors.js";
import jwt from "jsonwebtoken";

// REGISTER
export const signup = async (req, res, next) => {
  try {
    console.log(req.body);

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new UserDetails({
      user_name: req.body.user_name,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });

  } catch (err) {
    next(err);
  }
};

// LOGIN
export const signin = async (req, res, next) => {
  try {

    const user = await UserDetails.findOne({
      user_name: req.body.user_name,
    });

    if (!user) {
      return next(
        createError(404, "User not found")
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(
        createError(400, "Wrong password")
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("Access_Token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherDetails);

  } catch (err) {
    next(err);
  }
};