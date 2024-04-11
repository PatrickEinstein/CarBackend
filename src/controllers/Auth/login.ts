import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        error: "Invalid Credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid Credentials",
      });
    }

    const userWithoutPassword = {
      ...user.toObject(),
      password: undefined,
      __v: undefined,
    };

    const token = jwt.sign(
      { userId: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      token: token,
      responseData: userWithoutPassword,
      responseMessage: "Successful",
      responseCode: "00",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: false,
      error: "Internal Server Error",
      responseMessage: "Failed",
      responseCode: "99",
    });
  }
};
