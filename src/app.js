import "express-async-errors";
import express from "express";
import notFound from "./middlewares/not-found.middlewares.js";
import errorHandler from "./middlewares/error-handler.middlewares.js";
import connectDB from "./config/db.config.js";
import { auth } from "./features/auth/index.js";
import { jobs } from "./features/jobs/index.js";
import authenticateUser from "./middlewares/auth.middlewares.js";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/auth", auth);

app.use("/api/v1/jobs", authenticateUser, jobs);

app.use(notFound);
app.use(errorHandler);

export default app;
