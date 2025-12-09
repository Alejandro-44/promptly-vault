import { cleanup, screen, waitFor } from "@testing-library/react";
import UserCard from "./UserCard";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";
import { useUserStore } from "../contexts";

describe("UserCard", () => {
  beforeEach(() => {
    useUserStore.setState({
      user: {
        id: "1",
        email: "johndoe@example.com",
        username: "johndoe",
        is_active: true,
      },
    });
    renderWithProviders(<UserCard />);
  });

  afterEach(() => {
    cleanup();
  });

  test("renders UserCard component", async () => {
    await waitFor(() => {
        expect(screen.getByText("JO")).toBeDefined();
        expect(screen.getByText("johndoe")).toBeDefined();
    })
  });
});
