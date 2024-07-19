const express = require("express");

const { validateFirebaseIdToken } = require("../middlewares/auth.middleware");
const { createBlogPost } = require("../services/posts.service");
const { validateRequestBody } = require("../middlewares/validation.middleware");
const { CreateBlogPostSchema } = require("../schemas/posts.schema");

const router = express.Router();

router.post(
  "/",
  validateFirebaseIdToken,
  validateRequestBody(CreateBlogPostSchema),
  createBlogPost
);

module.exports = router;
