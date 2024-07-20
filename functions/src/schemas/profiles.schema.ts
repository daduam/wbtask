import z from "zod";

export const CreateUserProfileSchema = z.object({
  gender: z.string().min(1),
  bio: z.string().min(3),
  country: z.string().min(1),
});

export const UpdateUserProfileSchema = z.object({
  gender: z.string().min(1),
  bio: z.string().min(3),
  country: z.string().min(1),
});
