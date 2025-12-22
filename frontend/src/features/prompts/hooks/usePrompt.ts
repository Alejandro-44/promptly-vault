import { PromptsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

type UsePrompt = {
  promptId: string;
};

export function usePrompt({ promptId }: UsePrompt) {
    return useQuery({
    queryKey: ['prompt', promptId],
    queryFn: () => PromptsService.getPromptDetail(promptId),
  })
}
