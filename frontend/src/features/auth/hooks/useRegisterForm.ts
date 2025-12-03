import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormValues } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useResigerForm() {
  return useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    criteriaMode: "all",
    mode: "all"
  });
}
