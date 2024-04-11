import { RequestHandler } from "express";
import User from "../../models/User.js";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const page: number = parseInt(req.params.page as string, 10) || 1;
    const pageSize: number = parseInt(req.params.pageSize as string, 10) || 10;
    const skip: number = (page - 1) * pageSize;
    const allProducts = await User.find({})
      .select("-password")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: allProducts,
    });
  } catch (e: any) {
    res.status(200).json({
      status: false,
      message: e.message,
    });
  }
};
