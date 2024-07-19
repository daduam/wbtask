const z = require("zod");

const CreateBlogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
});

module.exports = { CreateBlogPostSchema };
