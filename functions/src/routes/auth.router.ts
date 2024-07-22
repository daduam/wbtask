import { Router } from "express";

import {
  logInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "../handlers/auth.handler";
import { validateRequestBody } from "../middlewares/validation.middleware";
import {
  EmailAndPasswordLogInSchema,
  EmailAndPasswordSignUpSchema,
} from "../schemas/auth.schema";

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
