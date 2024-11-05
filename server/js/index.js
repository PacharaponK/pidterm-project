"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./router/userRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;
const URL = process.env.URL || "localhost";
const app = (0, express_1.default)();
mongoose_1.default.connect(MONGO_URL).catch((err) => console.log(err));
app.use(express_1.default.json());
app.use("/users", userRoutes_1.default);
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`[Server] Server is running on http://${URL}:${PORT}`);
});
mongoose_1.default.connection.on("connected", () => {
    console.log("[Mongoose] Mongoose connected to DB on Atlas");
});
