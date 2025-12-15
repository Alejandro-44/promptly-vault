import { UsersService } from "@/services";
import { useQuery } from "@tanstack/react-query";

type UseUserParams = {
  mode: "me" | "public",
  userId?: string
}

export function useUser({ mode, userId }: UseUserParams) {
  const { data: user } = useQuery({
    queryKey:
      mode === 'me'
        ? ['user', 'me']
        : ['user', userId],
    queryFn: () =>
      mode === 'me'
        ? UsersService.getMe()
        : UsersService.getUserById(userId!),
  })

  return {
    user
  }
}
