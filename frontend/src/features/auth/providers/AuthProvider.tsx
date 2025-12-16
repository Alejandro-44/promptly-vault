import { useEffect } from "react";
import { useMe } from "@/features/auth/hooks/useAuth";
import { useUserStore } from "@/features/users/contexts";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isError } = useMe();

  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const setLoading = useUserStore((s) => s.setLoading);

  useEffect(() => {
    if (data) {
      setUser(data);
      setLoading(false);
    }

    if (isError) {
      clearUser();
      setLoading(false);
    }
  }, [data, isError]);

  return <>{children}</>;
}
