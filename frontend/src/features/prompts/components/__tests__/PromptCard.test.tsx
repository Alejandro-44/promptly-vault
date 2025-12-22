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
  afterEach(() => {
    cleanup();
  });
  it("render PromptCard component", () => {
    renderWithProviders(
      <PromptCard prompt={mockPrompt} />
    );
    expect(screen.getByText(/Generate a marketing headline/)).toBeDefined();
    expect(screen.getByText(/gpt-4/)).toBeDefined();
    expect(screen.getByText(/johndoe/)).toBeDefined();
  });
  it("display all tags", () => {
    renderWithProviders(
      <PromptCard prompt={mockPrompt} />
    );
    mockPrompt.tags.forEach((tag) => {
      expect(screen.findByText(new RegExp(tag, "i"))).toBeDefined();
    });
  });
  it("navigate to prompt detail page on click", () => {
    const { router } = renderWithProviders(
      <PromptCard prompt={mockPrompt} />
    );
    const link = screen.getByTestId("prompt-link");
    fireEvent.click(link);
    expect(router.state.location.pathname).toBe("/prompts/abc-123");
  });
  it("navigate to prompt edit page when click edit button", () => {
    const { router } = renderWithProviders(
      <PromptCard prompt={mockPrompt} editable={true} />
    );
    const link = screen.getByTestId("edit-link");
    fireEvent.click(link)
    expect(router.state.location.pathname).toBe("/prompts/abc-123/edit");
  })
});
