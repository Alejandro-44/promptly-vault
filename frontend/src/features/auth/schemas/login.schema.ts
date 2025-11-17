import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").refine((val) => val.length > 0, "The email is required"),
  password: z.string().min(1, "The password is required")
});

export type LoginFormValues = z.infer<typeof loginSchema>;
