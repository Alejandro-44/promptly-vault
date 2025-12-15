import { cleanup, fireEvent, screen } from "@testing-library/react";
import { PromptCard } from "../PromptCard";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mockPrompt = {
  id: "abc-123",
  title: "Generate a marketing headline",
  model: "gpt-4",
  tags: ["marketing", "copywriting", "saas"],
  user: "johndoe",
};

describe("PromptCard", () => {
  beforeEach(() => {
    renderWithProviders(
      <PromptCard {...mockPrompt} />
    );
  });

  afterEach(() => {
    cleanup();
  });
  test("should render PromptCard component", () => {
    expect(screen.findByText(/Generate a marketing headline/)).toBeDefined();
    expect(screen.findByText(/gpt-4/)).toBeDefined();
    expect(screen.findByText(/johndoe/)).toBeDefined();
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
