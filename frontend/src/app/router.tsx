import { createBrowserRouter } from "react-router";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Layout } from "@/components/Layout";
import UserPage from "@/features/users/page/UserPage";
import { rootLoader } from "./loaders/userLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: rootLoader,
    children: [
      {
        path: "login",
        Component: LoginPage
      },
      {
        path: "register",
        Component: RegisterPage
      },
      {
        path: "users",
        children: [
          {
            path: "me",
            Component: UserPage
          }
        ]
      }
    ],
  },
]);
