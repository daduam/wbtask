import { Router } from "express";

import {
  createUserProfile,
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../handlers/profiles.handler";
import { validateFirebaseIdToken } from "../middlewares/auth.middleware";
import { validateRequestBody } from "../middlewares/validation.middleware";
import {
  CreateUserProfileSchema,
  UpdateUserProfileSchema,
} from "../schemas/profiles.schema";

const router = Router();

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

router.get("/:userId", getUserProfile);

router.delete("/:userId", validateFirebaseIdToken, deleteUserProfile);

export default router;
