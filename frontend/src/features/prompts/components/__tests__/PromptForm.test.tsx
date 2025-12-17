import { renderWithProviders } from "@/tests/utils/renderWithProviders";
import { PromptForm } from "../PromptForm";
import { cleanup, screen } from "@testing-library/react";

const mockOnSubmit = vitest.fn();

describe("PromptForm", () => {
  beforeEach(() => {
    renderWithProviders(<PromptForm onSubmit={mockOnSubmit} />);
  })

  afterEach(() => {
    cleanup();
  })

  it("renders without crashing", () => {
    expect(screen.getByLabelText(/title/i)).toBeDefined();
    expect(screen.getByLabelText(/prompt/i)).toBeDefined();
    expect(screen.getByLabelText(/result/i)).toBeDefined();
    expect(screen.getByLabelText(/tags/i)).toBeDefined();
    expect(screen.getByLabelText(/model/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /share/i })).toBeDefined();
  });

  
});
