import * as z from "zod";

export const CreateBlogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
});

export const UpdateBlogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
});
