"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.createError = void 0;
class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
const createError = (status, message) => {
    return new CustomError(status, message);
};
exports.createError = createError;
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message,
    });
};
exports.errorHandler = errorHandler;
