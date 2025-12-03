import z from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: (issue) => {
      const { input } = issue
      if (typeof input !== "string") return undefined;
      if (input.length === 0) return "The email is required" 
      return undefined;
    }
  }),
  password: z.string().min(1, "The password is required")
});

export type LoginFormValues = z.infer<typeof loginSchema>;
