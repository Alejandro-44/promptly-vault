import { Navigate, Outlet } from "react-router";
import { useUserStore } from "@/features/users/contexts";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useUserStore();

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}
