import express from "express";
import { register } from "../controllers/Auth/register.js";

const RegisterRouter = express.Router();

/**
 * @openapi
 * paths:
 *   /api/register:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Register a new user
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
 *                 profilePicture:
 *                   type: string
 *                   format: binary
 *                   description: User's profile picture
 *       responses:
 *         '201':
 *           description: User registered successfully
 *         '400':
 *           description: Invalid request, check request body for errors
 *         '500':
 *           description: Internal server error
 */

RegisterRouter.post("/api/register", register);

export default RegisterRouter;
