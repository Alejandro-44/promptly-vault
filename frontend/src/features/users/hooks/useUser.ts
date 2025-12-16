import { UsersService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../contexts";


type UseUserParams = {
  mode: "me" | "public";
  userId?: string;
};

export function useUser({ mode, userId }: UseUserParams) {
  const authUser = useUserStore((state) => state.user);

  const { data: publicUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => UsersService.getUserById(userId!),
    enabled: mode === "public" && !!userId,
  });

  return {
    user: mode === "me" ? authUser : publicUser,
  };
}
