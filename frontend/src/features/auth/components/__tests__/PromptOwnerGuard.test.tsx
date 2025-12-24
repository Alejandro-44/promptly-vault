import { cleanup, screen, waitFor } from "@testing-library/react";
import { useUserStore } from "@/features/users/contexts";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";


describe("PromptOwnerGuard", () => {
  beforeEach(() => {
    useUserStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  afterEach(cleanup);

  test("shows loading while fetching prompt", () => {
    useUserStore.setState({
      user: { id: "123-abc", username: "johndoe" } as any,
      isAuthenticated: true,
      isLoading: false,
    });

    renderWithProviders(null, ["/prompts/abc-123/edit"]);
    expect(screen.getByRole("progressbar")).toBeDefined();
  });

  test("navigates to home 404 when doesn't find the prompt", async () => {
    useUserStore.setState({
      user: { id: "123-abc", username: "johndoe" } as any,
      isAuthenticated: true,
      isLoading: false,
    });
    renderWithProviders(null, ["/prompts/invalid-id/edit"]);
    await waitFor(() => {
      expect(screen.getByText("404")).toBeDefined();
    });
  });

  test("navigates to 403 if user is not the owner", async () => {
    useUserStore.setState({
      user: { id: "456-def", username: "alex" } as any,
      isAuthenticated: true,
      isLoading: false,
    });

    renderWithProviders(null, ["/prompts/abc-123/edit"]);

    await waitFor(() => {
      expect(screen.getByText("403")).toBeDefined();
    });
  });

  test("renders outlet if user is the owner", async () => {
    useUserStore.setState({
      user: { id: "123-abc", username: "johndoe" } as any,
      isAuthenticated: true,
      isLoading: false,
    });

    renderWithProviders(null, ["/prompts/abc-123/edit"]);

    await waitFor(() => {
      expect(screen.getByText("Edit Prompt")).toBeDefined();
    });
  });
});
