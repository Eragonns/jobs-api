import "express-async-errors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

import notFound from "./middlewares/not-found.middlewares.js";
import errorHandler from "./middlewares/error-handler.middlewares.js";
import connectDB from "./config/db.config.js";
import { auth } from "./features/auth/index.js";
import { jobs } from "./features/jobs/index.js";
import authenticateUser from "./middlewares/auth.middlewares.js";
import { StatusCodes } from "http-status-codes";

const app = express();

const swaggerDocument = YAML.load("./swagger.yaml");

connectDB();

app.use(cors());
app.use(mongoSanitize());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limite de 100 requette
    standardHeaders: "draft-7",
    legacyHeaders: false
  })
);
app.use(helmet());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/", (_req, res) => {
  res
    .status(StatusCodes.OK)
    .send("<h1>API JOBS</h1><a href='/api-docs'>Documentation</a>");
});

app.use("/api/v1/auth", auth);

app.use("/api/v1/jobs", authenticateUser, jobs);

app.use(notFound);
app.use(errorHandler);

export default app;
