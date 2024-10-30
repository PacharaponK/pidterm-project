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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = require("./UserModel");
const app = (0, express_1.default)();
const PORT = 3001;
mongoose_1.default
    .connect("mongodb+srv://admin:Realtime123@realtime.9zx7z.mongodb.net/")
    .catch((err) => console.log(err));
app.use(express_1.default.json());
app.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (yield UserModel_1.User.isUserExits(body.email)) {
        res
            .status(409)
            .send({ mes: "The email address is already in use. Please provide a different email" });
    }
    const user = new UserModel_1.User(body);
    yield user.save();
    const _a = user.toObject(), { password } = _a, acc = __rest(_a, ["password"]);
    res.status(201).json({ message: "Account created successfully.", user: { acc } });
}));
app.get("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const isUserExits = yield UserModel_1.User.findOne({ email: body.email });
    if (!isUserExits) {
        res.status(404).json({
            message: "No account found with that email address. Please check your email or register for a new account.",
        });
    }
    res.status(200).send({ mes: "ok" });
}));
app.listen(PORT, () => {
    console.log(`[Server] Server is running on http://localhost:${PORT}`);
});
mongoose_1.default.connection.on("connected", () => {
    console.log("[Mongoose] Mongoose connected to DB on Atlas");
});
