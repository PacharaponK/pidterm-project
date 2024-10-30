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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
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
UserSchema.static("isUserExits", function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield this.findOne({ email: email }))
            return true;
        return false;
    });
});
// UserSchema.method("isValidPassword", async function (password: string): Promise<boolean> {
// 	return await compare(password, this.password);
// });
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
