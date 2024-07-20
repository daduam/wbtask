import z from "zod";

export const EmailAndPasswordSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string(),
});

export const EmailAndPasswordLogInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
