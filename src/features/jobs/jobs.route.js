import express from "express";
const router = express.Router();

import * as jobsController from "./jobs.controller.js";
import { JobBodySchema, JobParamsSchema } from "./jobs.schema.js";
import validate from "../../middlewares/validation.middlewares.js";

router
  .route("/")
  .get(jobsController.getUsersJobs)
  .post(validate({ bodySchema: JobBodySchema }), jobsController.create);

router
  .route("/:id")
  .get(validate({ paramsSchema: JobParamsSchema }), jobsController.get)
  .put(
    validate({ paramsSchema: JobParamsSchema, bodySchema: JobBodySchema }),
    jobsController.update
  )
  .delete(validate({ paramsSchema: JobParamsSchema }), jobsController.remove);

export default router;
