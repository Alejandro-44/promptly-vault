import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  email: z.email(),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
