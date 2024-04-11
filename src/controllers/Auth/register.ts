import User from "../../models/User.js";
import { check, validationResult } from "express-validator";
import { RequestHandler } from "express";
import uploadResources from "../../config/Cloudinary.js";
import bcrypt from "bcrypt";

export const register: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    isAdmin,
    isActive,
  } = req.body;

  try {
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        status: false,
        message:
          "you must provide the neccsary first name, last name phone number and email",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    const displayImage =
      req.files[0] && (await uploadResources(req.files[0].path, "Display"));
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: passwordHash,
      displayImage,
      isAdmin,
      isActive,
    });
    newUser.save();

    const newUserWithoutPassword = {
      ...newUser.toObject(),
      password: undefined,
      __v: undefined,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      responseData: newUserWithoutPassword,
      responseMessage: "Successful",
      responseCode: "00",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      responseMessage: "Failed",
      responseCode: "99",
    });
  }
};
