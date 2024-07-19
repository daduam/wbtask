const express = require("express");

const { validateFirebaseIdToken } = require("../middlewares/auth.middleware");
const { validateRequestBody } = require("../middlewares/validation.middleware");
const {
  createBlogPost,
  getBlogPostById,
} = require("../services/posts.service");
const { CreateBlogPostSchema } = require("../schemas/posts.schema");

const router = express.Router();

router.post(
  "/",
  validateFirebaseIdToken,
  validateRequestBody(CreateBlogPostSchema),
  createBlogPost
);

router.get("/:postId", getBlogPostById);

module.exports = router;
