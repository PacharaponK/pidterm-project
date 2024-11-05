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
exports.User = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, "User email required"],
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email address format",
        },
    },
    password: {
        type: String,
        required: [true, "User password required"],
    },
}, { timestamps: true, versionKey: false });
UserSchema.method("isValidPassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcrypt_1.compare)(password, this.password);
    });
});
UserSchema.method("generateJWT", function (email) {
    return (0, jsonwebtoken_1.sign)({ email }, process.env.SECRET_KEY, { expiresIn: 60 * 5 });
});
UserSchema.static("isUserExits", function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ email: email });
    });
});
const saltRounds = 10;
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield (0, bcrypt_1.hash)(this.password, saltRounds);
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
