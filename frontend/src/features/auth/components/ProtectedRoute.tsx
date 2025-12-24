import { Outlet } from "react-router";
import { LoadingPage } from "@/pages/LoadingPage";
import { useAuth, useRedirectOn } from "../hooks";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  useRedirectOn({when: !isAuthenticated && !isLoading, to: "/403"})

  if (isLoading) {
    return <LoadingPage />;
  }

  return <Outlet />;
}
