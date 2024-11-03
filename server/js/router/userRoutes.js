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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserModel_1 = require("../models/UserModel");
const router = (0, express_1.Router)();
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        if (!(payload.email && payload.password && payload.name)) {
            const err = new Error("Bad Request");
            err.status = 400;
            next(err);
            return;
        }
        if (yield UserModel_1.User.isUserExits(payload.email)) {
            const err = new Error("The email address is already in use. Please provide a different email");
            err.status = 409;
            next(err);
            return;
        }
        const user = new UserModel_1.User({ email: payload.email, password: payload.password, name: payload.name });
        yield user.save();
        const _a = user.toObject(), { password } = _a, acc = __rest(_a, ["password"]);
        res.status(201).json({ message: "Account created successfully.", user: Object.assign({}, acc) });
    }
    catch (err) {
        next(err);
    }
}));
router.get("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const { email, password } = payload;
        if (!(email && password)) {
            const err = new Error("Bad Request");
            err.status = 400;
            next(err);
            return;
        }
        const user = yield UserModel_1.User.isUserExits(email);
        if (!user) {
            const err = new Error("No account found with that email address. Please check your email or register for a new account.");
            err.status = 404;
            next(err);
            return;
        }
        if (!(yield user.isValidPassword(password))) {
            const err = new Error("Unauthorized: Invalid password");
            err.status = 401;
            next(err);
            return;
        }
        // JWT Response
        res.status(200).send({ msg: "USER JWT" });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
