import { RequestHandler } from "express";
import Product from "../../models/Product.js";

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundProduct = await Product.findByIdAndDelete({ _id: id });
    if (foundProduct) {
      res.status(200).json({
        status: true,
        message: foundProduct.name,
      });
    } else {
      res.status(401).json({
        status: false,
        message: "This product does not exist",
      });
    }
  } catch (err: any) {
    res.status(401).json({
      status: false,
      message: err.message,
    });
  }
};
