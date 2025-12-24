import { PromptsService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

type UsePromptDelete = {
  promptId: string;
};

export function usePromptDelete({ promptId }: UsePromptDelete) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => PromptsService.delete(promptId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me", "prompts"] });
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({ queryKey: ["prompt", promptId] });
      navigate('/users/me');
    }
  })
}
