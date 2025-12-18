import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { AuthService, UsersService } from "@/services";
import type {
  UserCreateDTO,
  UserLoginDTO,
  UpdatePasswordDTO,
  User,
  Token,
} from "@/services";
import { useUserStore } from "@/features/users/contexts";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export function useMe() {
  return useQuery<User>({
    queryKey: authKeys.me,
    queryFn: () => UsersService.getMe(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation<User, Error, UserCreateDTO>({
    mutationFn: (data) => AuthService.register(data),
    onSuccess: () => {
      navigate("/login");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation<Token, Error, UserLoginDTO>({
    mutationFn: (data) => AuthService.login(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.me });
      const user = await UsersService.getMe();
      setUser(user);
      navigate("/users/me");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const clearUser = useUserStore((s) => s.clearUser);

  return useMutation<void, Error>({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.me });
      clearUser();
      navigate("/");
    },
  });
}

export function useChangePassword() {
  return useMutation<void, Error, UpdatePasswordDTO>({
    mutationFn: (data) => AuthService.changePassword(data),
  });
}
