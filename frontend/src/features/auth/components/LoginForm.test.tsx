import {
  screen,
  render,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import LoginForm from "./LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Login Form", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    );
  });

  afterEach(cleanup);

  it("Render the form successfuly", () => {
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /Log in/i })).toBeDefined();
  });

  it("display errors when fields are empty or with wrong format", async () => {
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(await screen.findByText(/The email is required/i)).toBeDefined();
    expect(screen.getByText(/The password is required/i)).toBeDefined();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "no-email" },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));

    expect(await screen.findByText(/Invalid email address/i)).toBeDefined();
  });

  it("", async () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(await screen.findByText(/Loading/i)).toBeDefined();

    await waitFor(() =>
      expect(screen.queryByText(/Loaging/i)).toBeNull()
    );
  });
});
