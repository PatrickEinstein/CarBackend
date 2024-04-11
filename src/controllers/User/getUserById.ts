import { RequestHandler } from "express";
import User from "../../models/User.js";

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Founduser = await User.findOne({ _id:id });
    if (Founduser) {
      res.status(200).json({
        status: true,
        message: Founduser,
      });
    } else {
      res.status(401).json({
        status: false,
        message: "This User does not exist",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
