import express from "express";
import { deleteProduct } from "../controllers/Products/deleteProduct.js";
import TokenVerification from "../middleware/TokenVerification.js";
const DeleteProductRouter = express.Router();
/**
 * @openapi
 * /api/delete/product/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: News deleted successfully
 *       '404':
 *         description: News not found
 *       '500':
 *         description: Internal server error
 */
DeleteProductRouter.delete("/api/delete/product/:id", TokenVerification, deleteProduct);
export default DeleteProductRouter;
