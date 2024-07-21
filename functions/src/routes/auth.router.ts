import { Router } from "express";

import { validateRequestBody } from "../middlewares/validation.middleware";
import {
  EmailAndPasswordLogInSchema,
  EmailAndPasswordSignUpSchema,
} from "../schemas/auth.schema";
import {
  logInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "../services/auth.service";

const router = Router();

router.post(
  "/signup",
  validateRequestBody(EmailAndPasswordSignUpSchema),
  signUpWithEmailAndPassword
);

router.post(
  "/login",
  validateRequestBody(EmailAndPasswordLogInSchema),
  logInWithEmailAndPassword
);

export default router;
