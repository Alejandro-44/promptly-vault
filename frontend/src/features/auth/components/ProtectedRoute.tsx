import { Outlet, useNavigate } from "react-router";
import { useUserStore } from "@/features/users/contexts";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useUserStore();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  if (!isAuthenticated) {
    navigate("/");
  }

  return <Outlet />;
}
