"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        Error: {
            code: err.status || 500,
            message: err.status ? err.message : "Internal Server Error",
        },
    });
};
exports.default = errorHandler;
