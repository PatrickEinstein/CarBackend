import express from "express";
import { getUser } from "../controllers/User/getUserById.js";
import TokenVerification from "../middleware/TokenVerification.js";
const GetAUserRouter = express.Router();
/**
 * @openapi
 * /api/get/user/{id}:
 *   get:
 *     tags:
 *      - User
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
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
GetAUserRouter.get("/api/get/user/:id", TokenVerification, getUser);
export default GetAUserRouter;
