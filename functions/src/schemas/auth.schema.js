const z = require("zod");

const EmailAndPasswordSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string(),
});

const EmailAndPasswordLogInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

module.exports = {
  EmailAndPasswordSignUpSchema,
  EmailAndPasswordLogInSchema,
};
