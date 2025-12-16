import { createBrowserRouter } from "react-router";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Layout } from "@/components/Layout";
import { UserPage } from "@/features/users/page/UserPage";
import { HomePage } from "@/features/home/pages/HomePage";
import { PromptDetail } from "@/features/prompts/pages/PromptDetail";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "users",
        children: [
          {
            Component: ProtectedRoute,
            children: [
              {
                path: "me",
                Component: () => <UserPage mode="me" />,
              },
            ],
          },
          {
            path: ":userId",
            Component: () => <UserPage mode="public" />,
          },
        ],
      },
      {
        path: "prompts",
        children: [
          {
            path: ":promptId",
            Component: PromptDetail,
          },
        ],
      },
    ],
  },
]);
