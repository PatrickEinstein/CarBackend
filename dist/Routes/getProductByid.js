import express from "express";
import { getProduct } from "../controllers/Products/getProductById.js";
import TokenVerification from "../middleware/TokenVerification.js";
const GetProductRouter = express.Router();
/**
 * @openapi
 * /api/get/product/{id}:
 *   get:
 *     tags:
 *      - Products
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: News retrieved successfully
 *       '404':
 *         description: News not found
 *       '500':
 *         description: Internal server error
 */
GetProductRouter.get("/api/get/product/:id", TokenVerification, getProduct);
export default GetProductRouter;
