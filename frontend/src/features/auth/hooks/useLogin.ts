import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/login";
import { setCurrentUser } from "@/features/users/api/setCurrentUser";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      await setCurrentUser();
      navigate("/users/me");
    },
  });
}
