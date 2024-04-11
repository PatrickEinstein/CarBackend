import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createError } from "./error.js";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      user: {
        id: string;
        email: string;
        isAdmin: boolean;
      };
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    req.userId = decoded.userId;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
    };
    next();
  } catch (error) {
    return next(createError(401, "Unauthorized"));
  }
};

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.userId === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

export { verifyToken, verifyUser, verifyAdmin };