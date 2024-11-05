"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        const err = new Error("Unauthorized");
        err.status = 401;
        next(err);
        return;
    }
    // console.log("+++token++++");
    // console.log(token);
    (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY, (error, user) => {
        // console.log("++++ERROR++++");
        // console.log(error.message);
        if (error) {
            const err = new Error(error.message);
            err.status = 401;
            next(err);
            return;
        }
        // console.log("++++USER++++");
        // console.log(user);
    });
    next();
});
exports.default = authenticateJWT;
