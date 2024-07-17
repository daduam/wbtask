const express = require("express");

const { signUpWithEmailAndPassword } = require("../services/auth.service");
const { validateRequestBody } = require("../middlewares/validation.middleware");
const { EmailAndPasswordSignUpSchema } = require("../schemas/auth.schema");

const router = express.Router();

router.post(
  "/signup",
  validateRequestBody(EmailAndPasswordSignUpSchema),
  signUpWithEmailAndPassword
);

module.exports = router;
