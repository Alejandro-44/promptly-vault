import { UsersService } from "@/services";
import { useQuery } from "@tanstack/react-query";

type UseUserPromptsParams = {
  mode: "me" | "public";
  userId?: string;
};

export function useUserPrompts({ mode, userId }: UseUserPromptsParams) {
  const isMe = mode === "me";

  const { data, isLoading, error } = useQuery({
    queryKey: isMe
      ? ["users", "me", "prompts"]
      : ["users", userId, "prompts"],
    queryFn: () =>
      isMe
        ? UsersService.getMyPrompts()
        : UsersService.getUserPrompts(userId!),
    enabled: isMe || !!userId,
  });

  return {
    prompts: data,
    isLoading,
    error,
  };
}
