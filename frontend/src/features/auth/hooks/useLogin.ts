import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/login";
import { setCurrentUser } from "@/features/users/api/setCurrentUser";

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => setCurrentUser()
  });
}
