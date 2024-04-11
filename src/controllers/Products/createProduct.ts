import { RequestHandler } from "express";
import Product from "../../models/Product.js";
import uploadResources from "../../config/Cloudinary.js";

export const createProduct: RequestHandler = async (req, res, next) => {
  const { name, price, location, createdBy, description, category } = req.body;

  console.log({ name, price, location, createdBy, description, category });

  if (!name || !price || !location || !createdBy || !description || !category) {
    return res.status(400).json({
      status: false,
      message: "Please provide all necessary information",
    });
  }
  try {
    const [Image, Video] = await Promise.all([
      req.files[0] &&
        (await uploadResources(req.files[0].path, "ProductsImage")),
      req.files[1] &&
        (await uploadResources(req.files[1].path, "ProductsVideo")),
    ]);

    const newProduct = await new Product({
      name,
      price,
      location,
      createdBy,
      description,
      category,
      Image,
      Video,
    });
    newProduct.save();
    return res.status(201).json({
      status: true,
      id: newProduct._id,
      message: `product '${newProduct.name}' was successfully created`,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: true,
      message: err.message,
    });
  }
};
