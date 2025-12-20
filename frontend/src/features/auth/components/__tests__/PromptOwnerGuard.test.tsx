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

  afterEach(cleanup)

  test("shows loading while fetching prompt", () => {
    useUserStore.setState({
      user: { id: "123-abc", username: "johndoe" } as any,
      isAuthenticated: true,
      isLoading: false,
    });

    renderWithProviders(null, ["/prompts/abc-123/edit"]);
    expect(screen.getByText("Loading prompt...")).toBeDefined();
  });

  test("navigates to home on error", async () => {
    useUserStore.setState({
      user: { id: "123-abc", username: "johndoe" } as any,
      isAuthenticated: true,
      isLoading: false,
    });
    renderWithProviders(null, ["/prompts/invalid-id/edit"]);
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeDefined();
    });
  });

  test("navigates to home if user is not the owner", async () => {
    useUserStore.setState({
      user: { id: "456-def", username: "alex" } as any,
      isAuthenticated: true,
      isLoading: false,
    });

    renderWithProviders(null, ["/prompts/abc-123/edit"]);

    await waitFor(() => {
      expect(screen.getByText("Home")).toBeDefined();
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
