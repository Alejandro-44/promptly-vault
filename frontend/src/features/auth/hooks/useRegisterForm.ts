import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormValues } from "../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useResigerForm() {
  return useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
}
