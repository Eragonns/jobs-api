import "express-async-errors";
import express from "express";
import notFound from "./middlewares/not-found.middlewares.js";
import errorHandler from "./middlewares/error-handler.middlewares.js";
import connectDB from "./config/db.config.js";
import { auth } from "./features/auth/index.js";
import jobsModel from "./features/jobs/jobs.model.js";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/auth", auth);

app.use("/api/v1/dashboard", jobsModel);

app.use(notFound);
app.use(errorHandler);

export default app;
