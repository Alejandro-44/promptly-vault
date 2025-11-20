import { createBrowserRouter } from "react-router";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Layout } from "@/components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true, 
        path: "login",
        Component: LoginPage
      },
      {
        path: "register",
        Component: RegisterPage
      },
    ],
  },
]);
