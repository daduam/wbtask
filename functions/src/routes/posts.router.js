const express = require("express");

const { validateFirebaseIdToken } = require("../middlewares/auth.middleware");
const { validateRequestBody } = require("../middlewares/validation.middleware");
const {
  createBlogPost,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
} = require("../services/posts.service");
const {
  CreateBlogPostSchema,
  UpdateBlogPostSchema,
} = require("../schemas/posts.schema");

const router = express.Router();

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

module.exports = router;
