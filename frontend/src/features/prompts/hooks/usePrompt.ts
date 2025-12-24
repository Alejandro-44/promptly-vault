import { PromptsService, type Prompt } from "@/services";
import type { ApiError } from "@/services/api/api.types";
import { useQuery } from "@tanstack/react-query";

type UsePrompt = {
  promptId: string;
};

export function usePrompt({ promptId }: UsePrompt) {
    return useQuery<Prompt, ApiError>({
    queryKey: ['prompt', promptId],
    queryFn: () => PromptsService.getPromptDetail(promptId),
  })
}
