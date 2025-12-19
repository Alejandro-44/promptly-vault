import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormValues } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useRegisterForm() {
  return useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    criteriaMode: "all",
    mode: "all"
  });
}
