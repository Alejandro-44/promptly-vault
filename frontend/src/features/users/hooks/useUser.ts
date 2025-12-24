import { UsersService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks";

type UseUserParams = {
  mode: "me" | "public";
  userId?: string;
};

export function useUser({ mode, userId }: UseUserParams) {
  const { user: authUser, isLoading: authLoading } = useAuth();

  const {
    data: publicUser,
    isLoading: publicLoading,
    error: publicError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => UsersService.getUserById(userId!),
    enabled: mode === "public" && !!userId,
  });

  const isLoading = mode === "me" ? authLoading : publicLoading;
  const error = mode === "me" ? null : publicError;
  const user = mode === "me" ? authUser : publicUser;

  return {
    user,
    isLoading,
    error,
  };
}
