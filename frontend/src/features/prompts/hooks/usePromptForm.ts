import { zodResolver } from "@hookform/resolvers/zod";
import { promptSchema, type PromptFormValues } from "../schemas/prompt.schema";
import { useForm } from "react-hook-form";

export function usePromptForm() {
  return useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    criteriaMode: "all",
    mode: "all",
  });
}
