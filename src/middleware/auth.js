"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return next((0, error_1.createError)(401, "Unauthorized"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        req.user = {
            id: decoded.userId,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        };
        next();
    }
    catch (error) {
        return next((0, error_1.createError)(401, "Unauthorized"));
    }
};
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => {
    if (req.userId === req.params.id || req.user.isAdmin) {
        next();
    }
    else {
        return next((0, error_1.createError)(403, "You are not authorized!"));
    }
};
exports.verifyUser = verifyUser;
const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    }
    else {
        return next((0, error_1.createError)(403, "You are not authorized!"));
    }
};
exports.verifyAdmin = verifyAdmin;
