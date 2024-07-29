/* eslint-disable object-curly-spacing */
import * as z from "zod";

export const CreateUserProfileSchema = z.object({
  gender: z
    .string({ message: "Gender is required" })
    .min(1, "Gender is required"),
  bio: z
    .string({ message: "Bio is required" })
    .min(3, "Bio must be at least 3 chars long"),
  country: z
    .string({ message: "Country is required" })
    .min(1, "Country is required"),
});

export const UpdateUserProfileSchema = z.object({
  gender: z
    .string({ message: "Gender is required" })
    .min(1, "Gender is required"),
  bio: z
    .string({ message: "Bio is required" })
    .min(3, "Bio must be at least 3 chars long"),
  country: z
    .string({ message: "Country is required" })
    .min(1, "Country is required"),
});
