import { PromptsService, type PromptCreate, type PromptCreateResponse } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useCreatePrompt() {
  const navigate = useNavigate()
  return useMutation<PromptCreateResponse, Error, PromptCreate>({
    mutationFn: (data) => PromptsService.create(data),
    onSuccess: (response) => {
      navigate(`/prompts/${response.id}`);
    }
  })
}
