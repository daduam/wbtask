const z = require("zod");

const CreateUserProfileSchema = z.object({
  gender: z.string().min(1).optional(),
  bio: z.string().min(3).optional(),
  country: z.string().min(1).optional(),
});

module.exports = {
  CreateUserProfileSchema,
};
