import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "The username is required"),
  email: z.email({
    error: (issue) => {
      const { input } = issue
      if (typeof input === "string") {
        if (input.length === 0) {
          return "The email is required"
        }
      } else {
        return "Email must be a string"
      }

      return issue.message
    }
  }),
  password: z
    .string()
    .min(1, "The password is required")
    .min(8, "The password must be at least 8 characters long")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[A-Z]/, "Must include at least one uppercase character"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

