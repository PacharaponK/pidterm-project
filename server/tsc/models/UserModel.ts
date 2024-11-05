import { sign, decode, verify } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { HydratedDocument, Model, model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
interface IUser {
	name: string;
	email: string;
	password: string;
}

interface IUserMedthods {
	isValidPassword: (password: string) => Promise<boolean>;
	generateJWT: (email: string) => string;
}

interface UserModel extends Model<IUser, {}, IUserMedthods> {
	isUserExits: (email: string) => Promise<HydratedDocument<IUser, IUserMedthods>>;
}

const UserSchema = new Schema<IUser, UserModel, IUserMedthods>(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			required: [true, "User email required"],
			unique: true,
			validate: {
				validator: function (value: string) {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
				},
				message: "Invalid email address format",
			},
		},
		password: {
			type: String,
			required: [true, "User password required"],
		},
	},
	{ timestamps: true, versionKey: false }
);

UserSchema.method("isValidPassword", async function (password: string): Promise<boolean> {
	return await compare(password, this.password);
});

UserSchema.method("generateJWT", function (email: string): string {
	return sign({ email }, process.env.SECRET_KEY as string, { expiresIn: 60 * 5 });
});

UserSchema.static("isUserExits", async function (email: string) {
	return await this.findOne({ email: email });
});

const saltRounds: number = 10;

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await hash(this.password, saltRounds);
	next();
});

export const User = model<IUser, UserModel>("User", UserSchema);
