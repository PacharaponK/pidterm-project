import express from "express";
import mongoose from "mongoose";
import userRoutes from "./router/userRoutes";
import errorHandler from "./middlewares/errorHandler";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL || "MONGO_URL";
const URL = process.env.URL || "localhost";

const app = express();
mongoose.connect(MONGO_URL).catch((err) => console.log(err));

app.use(express.json());
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`[Server] Server is running on http://${URL}:${PORT}`);
});

mongoose.connection.on("connected", () => {
	console.log("[Mongoose] Mongoose connected to DB on Atlas");
});
