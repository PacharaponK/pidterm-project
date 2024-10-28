import { hash } from "bcrypt";
import { model, Schema } from "mongoose";

interface IUser {
	name: string;
	email: string;
	password: string;
}

const UserSchema = new Schema<IUser>(
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
	{ timestamps: true }
);

const saltRounds: number = 10;

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const hashpassword: string = await hash(this.password, saltRounds);
	this.password = hashpassword;
	next();
});

export const User = model<IUser>("User", UserSchema);
