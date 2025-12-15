import type { User } from "@/services";
import { cleanup, screen, waitFor } from "@testing-library/react";
import { UserCard } from "../UserCard";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mockUser: User = {
  id: "user-123",
  username: "johndoe",
  isActive: true,
}


describe("UserCard", () => {
  beforeEach(() => {
    renderWithProviders(
      <UserCard user={mockUser} />
    );
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
