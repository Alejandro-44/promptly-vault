import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { PromptCardDetail } from "../PromptCardDetail";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

describe("PromptCardDetail", () => {
  beforeEach(() => {
    renderWithProviders(<PromptCardDetail promptId="abc-123" />);
  });

  afterEach(() => {
    cleanup();
  });

  test("should render prompt details", async () => {

    await waitFor(() => {
      expect(screen.getByText("gpt-4")).toBeDefined();
    });

    expect(screen.getByText("Generate a marketing headline")).toBeDefined();
    expect(screen.getByText("johndoe")).toBeDefined();
    expect(screen.getByText("Write a catchy marketing headline for a SaaS that helps users automate workflows.")).toBeDefined();
    expect(screen.getByText("Automate Everything: The Smartest Way to Scale Your Productivity.")).toBeDefined();

    const tags = ["marketing", "copywriting", "saas"];
    tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeDefined();
    });

    expect(screen.getByText("Copy")).toBeDefined();
  });

  test("should redirect to user profile on author name click", async () => {
    const link = screen.getByTestId("author-link");
    fireEvent.click(link);
    expect(screen.getByText("Author page")).toBeDefined();
  })
});
