import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterForm from "./RegisterForm";

describe("Register Page", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <RegisterForm />
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
      expect(screen.getByText(/Email already registered/i)).toBeDefined();
    });
  });

  it("display validation errors when data is incomplete or has wrong format", async () => {
    // No rellenamos nada
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    // Esperamos mensajes de validación
    expect(await screen.findByText(/The username is required/i)).toBeDefined();
    expect(screen.getByText(/The email is required/i)).toBeDefined();
    expect(screen.getByText(/The password is required/i)).toBeDefined();

    // Probamos formato inválido
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "no-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    expect(await screen.findByText(/The email is required/i)).toBeDefined();
  });

  it("display loading message when click on register button", async () => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "loadingUser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "loading@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(await screen.findByText("Loading...")).toBeDefined();

    await waitFor(() =>
      expect(screen.getByText(/Successful registration/i)).toBeDefined()
    );
  });
});
