import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { RegisterPage } from "../pages/RegisterPage";
import { server } from "@/tests/mocks/server";
import { http, HttpResponse } from "msw";

describe("Register Page", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <RegisterPage />
      </QueryClientProvider>
    );

  });

  afterEach(cleanup);

  it("allows a new user to be registered successfuly", async () => {    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "newUser" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Successful registration/i)).toBeDefined();
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

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "failUser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email already Registered/i)).toBeDefined();
    });
  });

  it("display validation errors when data is incomplete or has wrong format", async () => {
    // No rellenamos nada
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    // Esperamos mensajes de validación
    expect(
      await screen.findByText(/The username is required/i)
    ).toBeDefined();
    expect(
      screen.getByText(/The email is required/i)
    ).toBeDefined();
    expect(screen.getByText(/The password is required/i)).toBeDefined();

    // Probamos formato inválido
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "no-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    expect(
      await screen.findByText(/The email is required/i)
    ).toBeDefined();
  });
});
