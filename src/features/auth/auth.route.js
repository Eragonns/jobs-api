import express from "express";
import * as authController from "./auth.controllers.js";
import validate from "../../middlewares/validation.middlewares.js";
import { LoginUserSchema, RegisterUserSchema } from "../users/user.schema.js";
import authenticateUser from "../../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", validate(RegisterUserSchema), authController.register);
router.post("/login", validate(LoginUserSchema), authController.login);

router.get(
  "/dashboard/:id",
  validate(authenticateUser),
  authController.dashboard
);

export default router;
