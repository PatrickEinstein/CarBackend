import express from "express";
import { getAllProducts } from "../controllers/Products/getAllProducts.js";
import TokenVerification from "../middleware/TokenVerification.js";
const getAllProductsRouter = express.Router();
/**
 * @openapi
 * '/api/allProducts/{page}/{pageSize}':
 *   get:
 *     tags:
 *       - Products
 *     summary: This Endpoint to get all products
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: path
 *         name: pageSize
 *         required: true
 *         description: Number of items per page for pagination
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Bad request
 */
getAllProductsRouter.get("/api/allProducts/:page/:pageSize", TokenVerification, getAllProducts);
export default getAllProductsRouter;
