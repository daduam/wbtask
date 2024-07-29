/* eslint-disable object-curly-spacing */
import * as z from "zod";

export const EmailAndPasswordSignUpSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 chars long"),
  displayName: z
    .string({ message: "Display name is required" })
    .min(2, "Display name must be at least 2 chars long"),
});

export const EmailAndPasswordLogInSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string({ message: "Password is required" })
    .min(1, "Password is required"),
});
