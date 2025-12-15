import { cleanup, screen } from "@testing-library/react";
import { PromptsGrid } from "../PromptsGrid";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mockPrompts = [
  {
    id: "abc-123",
    title: "Generate a marketing headline",
    model: "gpt-4",
    tags: ["marketing", "copywriting", "saas"],
    authorName: "johndoe",
    pubDate: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "def-456",
    title: "Refactor JavaScript Code",
    model: "gpt-4o",
    tags: ["javascript", "refactor", "programming"],
    authorName: "johndoe",
    pubDate: new Date("2024-02-02T16:45:00Z"),
  },
  {
    id: "ghi-789",
    title: "Character backstory generator",
    model: "gpt-3.5",
    tags: ["storytelling", "writing", "fantasy"],
    authorName: "johndoe",
    pubDate: new Date("2024-02-10T08:12:00Z"),
  },
];

describe("PromptsGrid", () => {
  beforeEach(() => {
    renderWithProviders(<PromptsGrid prompts={mockPrompts} />);
  });
  afterEach(() => {
    cleanup();
  });

  test("should render Grid container with correct props", () => {
    const grid = screen.getByRole("grid");
    expect(grid).toBeDefined();
  });

  test("should render PromptCard components when prompts are loaded", async () => {
    expect(screen.getByText("Generate a marketing headline")).toBeDefined();
    mockPrompts.forEach((prompt) => {
      expect(screen.getByText(prompt.title)).toBeDefined();
    });

    const promptCards = screen.getAllByTestId("prompt-card");
    expect(promptCards).toHaveLength(mockPrompts.length);
  });
});
