// src/features/auth/tests/register.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import { RegisterPage } from "../pages/RegisterPage";

describe("RegisterPage", () => {
  const queryClient = new QueryClient();

  const renderWithProviders = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <RegisterPage />
      </QueryClientProvider>
    );

  it("permite registrar un nuevo usuario correctamente", async () => {
    renderWithProviders();

    // El formulario debe tener los campos necesarios
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "nuevoUsuario" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText(/registro exitoso/i)).toBeDefined();
    });
  });
});
