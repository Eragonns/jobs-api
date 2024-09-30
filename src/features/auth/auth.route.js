import express from "express";
const router = express.Router();
import validate from "../../middlewares/validation.middlewares.js";
import { LoginUserSchema, RegisterUserSchema } from "../users/user.schema.js";
import * as authController from "./auth.controllers.js";

router.post(
  "/register",
  validate({ bodySchema: RegisterUserSchema }),
  authController.register
);
router.post(
  "/login",
  validate({ bodySchema: LoginUserSchema }),
  authController.login
);

export default router;
