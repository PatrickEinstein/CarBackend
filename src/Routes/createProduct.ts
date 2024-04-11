import express from "express";
import { createProduct } from "../controllers/Products/createProduct.js";
import TokenVerification from "../middleware/TokenVerification.js";

const createProductRouter = express.Router();

/**
 * @openapi
 * paths:
 *   /api/create/products:
 *     post:
 *       tags:
 *         - Products
 *       summary: Create a new product
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the product
 *                 price:
 *                   type: number
 *                   description: Price of the product
 *                 location:
 *                   type: string
 *                   description: Location of the product
 *                 createdBy:
 *                   type: string
 *                   description: User who created the product
 *                 description:
 *                   type: string
 *                   description: Array of strings describing the product
 *                 category:
 *                   type: string
 *                   description: Category of the product
 *                 Image:
 *                   type: string
 *                   format: binary
 *                   description: image
 *                 Video:
 *                   type: string
 *                   format: binary
 *                   description: image
 *       responses:
 *         '201':
 *           description: Product created successfully
 *         '400':
 *           description: Invalid request, check request body for errors
 *         '500':
 *           description: Internal server error
 */

createProductRouter.post("/api/create/products", TokenVerification, createProduct);

export default createProductRouter;
