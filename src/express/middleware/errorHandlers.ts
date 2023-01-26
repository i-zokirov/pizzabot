import { ErrorRequestHandler, RequestHandler } from "express";

export const notFoundErrorHandler: RequestHandler = (req, res, next) => {
    const error = new Error(`Could not find ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = req.statusCode === 200 ? 500 : req.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
