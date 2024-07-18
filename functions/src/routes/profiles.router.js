const express = require("express");

const { validateFirebaseIdToken } = require("../middlewares/auth.middleware");
const { validateRequestBody } = require("../middlewares/validation.middleware");
const {
  CreateUserProfileSchema,
  UpdateUserProfileSchema,
} = require("../schemas/profiles.schema");
const {
  createUserProfile,
  updateUserProfile,
} = require("../services/profiles.service");

const router = express.Router();

router.post(
  "/",
  validateRequestBody(CreateUserProfileSchema),
  validateFirebaseIdToken,
  createUserProfile
);

router.post(
  "/:userId",
  validateRequestBody(UpdateUserProfileSchema),
  validateFirebaseIdToken,
  updateUserProfile
);

module.exports = router;
