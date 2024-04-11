import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../../models/User.js";
import uploadResources from "../../config/Cloudinary.js";

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      isAdmin,
      isActive,
    } = req.body;
    const FoundUser = await User.findOne({ _id: id });

    if (FoundUser) {
      const imageUrl =
        req.files[0] && (await uploadResources(req.files[0].path, "Users"));
      FoundUser.firstName = firstName || FoundUser.firstName;
      FoundUser.lastName = lastName || FoundUser.lastName;
      FoundUser.email = email || FoundUser.email;
      FoundUser.displayImage = imageUrl || FoundUser.displayImage;
      FoundUser.phoneNumber = phoneNumber || FoundUser.phoneNumber;
      FoundUser.password = password || FoundUser.password;
      FoundUser.isAdmin = isAdmin || FoundUser.isAdmin;
      FoundUser.isActive = isActive || FoundUser.isActive;

      FoundUser.save();
      res.status(200).json({
        status: false,
        message: FoundUser,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "This User could not be found",
      });
    }
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: err.message,
    });
  }
};
