import { cleanup, fireEvent, screen } from "@testing-library/react";
import { PromptCard } from "../PromptCard";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mockPrompt = {
  id: "abc-123",
  title: "Generate a marketing headline",
  model: "gpt-4",
  tags: ["marketing", "copywriting", "saas"],
  authorId: "123-abc",
  authorName: "johndoe",
  pubDate: new Date("2024-01-15T10:30:00Z"),
};

describe("PromptCard", () => {
  beforeEach(() => {
    renderWithProviders(
      <PromptCard prompt={mockPrompt} />
    );
  });

  afterEach(() => {
    cleanup();
  });
  test("should render PromptCard component", () => {
    expect(screen.getByText(/Generate a marketing headline/)).toBeDefined();
    expect(screen.getByText(/gpt-4/)).toBeDefined();
    expect(screen.getByText(/johndoe/)).toBeDefined();
  });
  test("should display all tags", () => {
    mockPrompt.tags.forEach((tag) => {
      expect(screen.findByText(new RegExp(tag, "i"))).toBeDefined();
    });
  });
  test("should navigate to prompt detail page on click", () => {
    const link = screen.getByTestId("prompt-link");
    fireEvent.click(link);
    expect(screen.getByText("Prompt detail")).toBeDefined();
  });
});
