import { PromptsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

type PromptHookParams = {
  promptId: string;
};

export function usePrompt({ promptId }: PromptHookParams) {
    return useQuery({
    queryKey: ['prompt', promptId],
    queryFn: () => PromptsService.getPromptDetail(promptId),
  })
}
