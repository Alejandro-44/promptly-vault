import { screen } from "@testing-library/react";
import { useUserStore } from "@/features/users/contexts";
import { waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

describe("ProtectedRoute", () => {
  test("redirects to 403 if user is not authenticated", async () => {
    useUserStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    renderWithProviders(null, ["/private"]);

    await waitFor(() => {
      expect(screen.getByText("403")).toBeDefined();
    });
  });

  test("renders private page when user is authenticated", () => {
    useUserStore.setState({
      user: { id: "1", username: "johndoe" } as any,
      isAuthenticated: true,
      isLoading: false,
    });

    renderWithProviders(null, ["/private"]);

    expect(screen.getByText("Private Page")).toBeDefined();
  });
});
