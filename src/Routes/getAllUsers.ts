import express from "express";
import { getUsers } from "../controllers/User/getAllUsers.js";
import TokenVerification from "../middleware/TokenVerification.js";

const getAllUsersRouter = express.Router();

/**
 * @openapi
 * '/api/allUser/{page}/{pageSize}':
 *   get:
 *     tags:
 *       - User
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

getAllUsersRouter.get("/api/allUser/:page/:pageSize",TokenVerification, getUsers);

export default getAllUsersRouter;
