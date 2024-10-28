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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
const app = (0, express_1.default)();
const PORT = 3001;
mongoose_1.default.connect("mongodb+srv://admin:Realtime123@realtime.9zx7z.mongodb.net/");
app.use(express_1.default.json());
app.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = new schema_1.User(body);
    yield user.save();
    res.status(200).send(user);
}));
app.get("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield schema_1.User.findOne({ name: "zerom" });
    res.status(200).send(user);
}));
app.listen(PORT, () => {
    console.log(`[Server] Server is running on http://localhost:${PORT}`);
});
mongoose_1.default.connection.on("connected", () => {
    console.log("[Mongoose] Mongoose connected to DB on Atlas");
});
