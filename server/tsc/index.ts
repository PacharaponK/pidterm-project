import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { User } from "./schema";

const app = express();
const PORT = 3001;

mongoose.connect("mongodb+srv://admin:Realtime123@realtime.9zx7z.mongodb.net/");

app.use(express.json());

app.post("/register", async (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	const user = new User(body);
	await user.save();
	res.status(200).send(user);
});

app.get("/login", async (req: Request, res: Response, next: NextFunction) => {
	const body = req.body;
	const user = await User.findOne({ name: "zerom" });
	res.status(200).send(user);
});

app.listen(PORT, () => {
	console.log(`[Server] Server is running on http://localhost:${PORT}`);
});

mongoose.connection.on("connected", () => {
	console.log("[Mongoose] Mongoose connected to DB on Atlas");
});
