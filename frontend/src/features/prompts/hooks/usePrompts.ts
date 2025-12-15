import { PromptsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function usePrompts() {
  const { data: prompts } = useQuery({
    queryKey: ["prompts"],
    queryFn: PromptsService.getAllPrompts
  })

  return { prompts };
}
