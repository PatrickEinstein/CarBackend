import express from "express";
import { updateUser } from "../controllers/User/updateUser.js";
import TokenVerification from "../middleware/TokenVerification.js";
const UpdateUserRouter = express.Router();

/**
 * @openapi
 * paths:
 *   /api/users/{id}:
 *     patch:
 *       tags:
 *         - User
 *       summary: Update a user by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user to update
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: User's first name
 *                 lastName:
 *                   type: string
 *                   description: User's last name
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address
 *                 phoneNumber:
 *                   type: string
 *                   description: User's phone number
 *                 password:
 *                   type: string
 *                   description: User's password
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indicates if the user is an admin
 *                 isActive:
 *                   type: boolean
 *                   description: Indicates if the user is active
 *                 displayImage:
 *                   type: string
 *                   format: binary
 *                   description: User's profile picture
 *       responses:
 *         '200':
 *           description: User updated successfully
 *         '400':
 *           description: Invalid request, check request body for errors
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal server error
 */

UpdateUserRouter.patch("/api/users/:id", TokenVerification, updateUser);
export default UpdateUserRouter;
