import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { Layout } from "@/components/Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<h1>Bienvenido a Promptly Vault</h1>} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
  )
);
