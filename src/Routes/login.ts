import express from "express";
import { login } from "../controllers/Auth/login.js";

const LoginRouter = express.Router();

/**
 * @openapi
 * paths:
 *   /api/login:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Authenticate user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   format: password
 *       responses:
 *         200:
 *           description: User successfully authenticated
 *         401:
 *           description: Unauthorized, incorrect email or password
 *         400:
 *           description: Invalid input, check request body for errors
 */

// Define your endpoint handling code here

LoginRouter.post("/api/login", login);

export default LoginRouter;
