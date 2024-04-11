class CustomError extends Error {
    status;
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
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message,
    });
};
export { createError, errorHandler };
