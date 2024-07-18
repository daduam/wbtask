const z = require("zod");

const CreateUserProfileSchema = z.object({
  gender: z.string().min(1),
  bio: z.string().min(3),
  country: z.string().min(1),
});

const UpdateUserProfileSchema = z.object({
  gender: z.string().min(1),
  bio: z.string().min(3),
  country: z.string().min(1),
});

module.exports = {
  CreateUserProfileSchema,
  UpdateUserProfileSchema,
};
