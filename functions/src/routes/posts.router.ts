import { Router } from "express";

import { validateFirebaseIdToken } from "../middlewares/auth.middleware";
import { validateRequestBody } from "../middlewares/validation.middleware";
import {
  CreateBlogPostSchema,
  UpdateBlogPostSchema,
} from "../schemas/posts.schema";
import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
} from "../services/posts.service";

const router = Router();

router.post(
  "/",
  validateFirebaseIdToken,
  validateRequestBody(CreateBlogPostSchema),
  createBlogPost
);

router.get("/:postId", getBlogPostById);

router.get("/", getAllBlogPosts);

router.put(
  "/:postId",
  validateFirebaseIdToken,
  validateRequestBody(UpdateBlogPostSchema),
  updateBlogPost
);

router.delete("/:postId", validateFirebaseIdToken, deleteBlogPost);

export default router;
