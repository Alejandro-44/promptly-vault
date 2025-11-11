import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "The username is required"),
  email: z.string().min(1, "The email is required").email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, "The password is required")
    .min(6, "The password must be at least 6 characters long"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

