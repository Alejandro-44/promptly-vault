import { PromptsService, type PromptUpdate } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

type UsePromptUpdate = {
  promptId: string;
};

export function usePromptUpdate({ promptId }: UsePromptUpdate) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (updateData: PromptUpdate) => 
      PromptsService.update(promptId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me", "prompts"] });
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({ queryKey: ["prompt", promptId] });
      navigate(`/prompts/${promptId}`);
    }
  })
}
