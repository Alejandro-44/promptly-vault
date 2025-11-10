// src/features/auth/tests/register.test.tsx
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, afterEach } from "vitest";
import { RegisterPage } from "../pages/RegisterPage";
import { server } from "@/tests/mocks/server";
import { http, HttpResponse } from "msw";

describe("RegisterPage", () => {
  const queryClient = new QueryClient();

  const renderWithProviders = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <RegisterPage />
      </QueryClientProvider>
    );
  
  afterEach(cleanup)

  it("allows a new user to be registered successfuly", async () => {
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

  it("displays an error message if registration fails", async () => {
    // Reemplazamos el handler del MSW para devolver un 409
    server.use(
      http.post("http://localhost:8000/auth/register", () =>
        HttpResponse.json(
          { detail: "Email already Registered" },
          { status: 409 }
        )
      )
    );

    renderWithProviders();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "failUser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email already Registered/i)).toBeDefined();
    });
  });
});
