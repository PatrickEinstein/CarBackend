import express from "express";
import { deleteUser } from "../controllers/User/deleteUser.js";
import TokenVerification from "../middleware/TokenVerification.js";

const DeleteUserRouter = express.Router();

/**
 * @openapi
 * /api/delete/user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID the user to delete
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

DeleteUserRouter.delete("/api/delete/user/:id",TokenVerification, deleteUser);
export default DeleteUserRouter;
