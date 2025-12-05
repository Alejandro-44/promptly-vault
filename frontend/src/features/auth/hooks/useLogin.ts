import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/login";
import { getCurrentUser } from "@/features/users/api/getCurrentUser";
import { useNavigate } from "react-router";
import { useUserStore } from "@/features/users/contexts";

export function useLogin() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      const user = await getCurrentUser();
      setUser(user);
      navigate("/users/me");
    },
  });
}
