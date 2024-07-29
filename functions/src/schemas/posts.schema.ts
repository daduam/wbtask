/* eslint-disable object-curly-spacing */
import * as z from "zod";

export const CreateBlogPostSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, "Title must at least 1 char long"),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description must be at least 1 char long"),
  body: z
    .string({ message: "Body is required" })
    .min(1, "Body must be at least 1 char long"),
});

export const UpdateBlogPostSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, "Title must at least 1 char long"),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description must be at least 1 char long"),
  body: z
    .string({ message: "Body is required" })
    .min(1, "Body must be at least 1 char long"),
});
