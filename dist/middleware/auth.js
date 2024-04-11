import jwt from "jsonwebtoken";
import { createError } from "./error.js";
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return next(createError(401, "Unauthorized"));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        req.user = {
            id: decoded.userId,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        };
        next();
    }
    catch (error) {
        return next(createError(401, "Unauthorized"));
    }
};
const verifyUser = (req, res, next) => {
    if (req.userId === req.params.id || req.user.isAdmin) {
        next();
    }
    else {
        return next(createError(403, "You are not authorized!"));
    }
};
const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    }
    else {
        return next(createError(403, "You are not authorized!"));
    }
};
export { verifyToken, verifyUser, verifyAdmin };
