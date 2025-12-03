import { cleanup, render, screen, waitFor } from "@testing-library/react";
import UserCard from "./UserCard";
import { queryClient } from "@/app/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

describe("UserCard", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserCard />
      </QueryClientProvider>
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
