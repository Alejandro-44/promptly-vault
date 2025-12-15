import { createBrowserRouter } from "react-router";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Layout } from "@/components/Layout";
import { UserPage } from "@/features/users/page/UserPage";
import { rootLoader } from "./loaders/userLoader";
import { HomePage } from "@/features/home/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: rootLoader,
    children: [
      {
        index: true,
        Component: HomePage,
      },
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
      },
      {
        path: "prompts",
        children: [
          {
            path: ":id",
            Component: () => <div>Prompt Detail Page</div>
          }
        ]
      }
    ],
  },
]);
