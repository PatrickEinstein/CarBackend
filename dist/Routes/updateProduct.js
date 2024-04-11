import express from "express";
import { updateProduct } from "../controllers/Products/updateProduct.js";
import TokenVerification from "../middleware/TokenVerification.js";
const UpdateProductRouter = express.Router();
/**
 * @openapi
 * /update/product/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Update an product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product to update
 *               location:
 *                 type: string
 *                 description: The location of the product to update
 *               description:
 *                 type: string
 *                 description: The description of the product to update
 *               price:
 *                 type: number
 *                 description: The price of the product to update
 *               category:
 *                 type: string
 *                 description: The price of the product to update
 *               Image:
 *                 type: string
 *                 format: binary
 *                 description: The new picture for the News
 *               Video:
 *                 type: string
 *                 format: binary
 *                 description: The new picture for the News
 *     responses:
 *       '200':
 *         description: News updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: News not found
 *       '500':
 *         description: Internal server error
 */
UpdateProductRouter.patch("/update/product/:id", TokenVerification, updateProduct);
export default UpdateProductRouter;
