import { Navigate, Outlet } from "react-router";
import { useUserStore } from "@/features/users/contexts";
import { LoadingPage } from "@/pages/LoadingPage";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useUserStore();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}
