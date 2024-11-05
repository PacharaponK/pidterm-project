import { Request, Response, NextFunction, Router } from "express";
import { User } from "../models/UserModel";
import authenticateJWT from "../middlewares/authenticateJWT";

const router = Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload = req.body;

		if (!(payload.email && payload.password && payload.name)) {
			const err: any = new Error("Bad Request");
			err.status = 400;
			next(err);
			return;
		}

		if (await User.isUserExits(payload.email)) {
			const err: any = new Error(
				"The email address is already in use. Please provide a different email"
			);
			err.status = 409;
			next(err);
			return;
		}
		const user = new User({ email: payload.email, password: payload.password, name: payload.name });
		await user.save();
		const { password, ...acc } = user.toObject();
		res.status(201).json({ message: "Account created successfully.", user: { ...acc } });
	} catch (err) {
		next(err);
	}
});

router.get("/login", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload = req.body;
		const { email, password } = payload;
		if (!(email && password)) {
			const err: any = new Error("Bad Request");
			err.status = 400;
			next(err);
			return;
		}
		const user = await User.isUserExits(email);
		if (!user) {
			const err: any = new Error(
				"No account found with that email address. Please check your email or register for a new account."
			);
			err.status = 404;
			next(err);
			return;
		}

		if (!(await user.isValidPassword(password))) {
			const err: any = new Error("Unauthorized: Invalid password");
			err.status = 401;
			next(err);
			return;
		}
		// JWT Response
		const JWT = user.generateJWT(email);
		res.status(200).send({ Token: JWT });
	} catch (err) {
		next(err);
	}
});

router.get("/test", authenticateJWT, async (req: Request, res: Response, next: NextFunction) => {
	res.send({ msg: "ok" });
});

export default router;
