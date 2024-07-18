const express = require("express");

const { validateFirebaseIdToken } = require("../middlewares/auth.middleware");
const { validateRequestBody } = require("../middlewares/validation.middleware");
const { CreateUserProfileSchema } = require("../schemas/profiles.schema");
const { createUserProfile } = require("../services/profiles.service");

const router = express.Router();

router.post(
  "/",
  validateRequestBody(CreateUserProfileSchema),
  validateFirebaseIdToken,
  createUserProfile
);

module.exports = router;
