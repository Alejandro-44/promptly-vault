import { UsersService } from "@/services";
import { useQuery } from "@tanstack/react-query";

type UseUserPromptsParams = {
  mode: "me" | "public";
  userId?: string;
};

export function useUserPrompts({ mode, userId }: UseUserPromptsParams) {
  const {
    data: prompts,
    isLoading,
    error,
  } = useQuery({
    queryKey: mode === "me" ? ["prompts", "me"] : ["prompts", userId],
    queryFn: () =>
      mode === "me"
        ? UsersService.getMyPrompts()
        : UsersService.getUserPrompts(userId!),
  });
  return { prompts, isLoading, error };
}
