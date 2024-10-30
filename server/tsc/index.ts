import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { User } from "./UserModel";

const app = express();
const PORT = 3001;

mongoose
	.connect("mongodb+srv://admin:Realtime123@realtime.9zx7z.mongodb.net/")
	.catch((err) => console.log(err));

app.use(express.json());

app.post("/register", async (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	if (await User.isUserExits(body.email)) {
		res
			.status(409)
			.send({ mes: "The email address is already in use. Please provide a different email" });
	}
	const user = new User(body);
	await user.save();
	const { password, ...acc } = user.toObject();
	res.status(201).json({ message: "Account created successfully.", user: { acc } });
});

app.get("/login", async (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	const isUserExits = await User.findOne({ email: body.email });
	if (!isUserExits) {
		res.status(404).json({
			message:
				"No account found with that email address. Please check your email or register for a new account.",
		});
	}

	res.status(200).send({ mes: "ok" });
});

app.listen(PORT, () => {
	console.log(`[Server] Server is running on http://localhost:${PORT}`);
});

mongoose.connection.on("connected", () => {
	console.log("[Mongoose] Mongoose connected to DB on Atlas");
});
