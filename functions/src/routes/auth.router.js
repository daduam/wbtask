const express = require("express");

const {
  signUpWithEmailAndPassword,
  logInWithEmailAndPassword,
} = require("../services/auth.service");
const { validateRequestBody } = require("../middlewares/validation.middleware");
const {
  EmailAndPasswordSignUpSchema,
  EmailAndPasswordLogInSchema,
} = require("../schemas/auth.schema");

const router = express.Router();

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

module.exports = router;
