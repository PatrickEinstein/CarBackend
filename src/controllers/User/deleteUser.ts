import { RequestHandler } from "express";
import User from "../../models/User.js";

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const FoundUser = await User.findOneAndDelete({ _id: id });
    if (FoundUser) {
      res.status(200).json({
        status: true,
        message: `${FoundUser.firstName} deleted`,
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
