import { renderWithProviders } from "@/tests/utils/renderWithProviders";
import { PromptForm } from "../PromptForm";
import { cleanup, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const mockOnSubmit = vi.fn();
const mockOnDelete = vi.fn();

const mockPrompt = {
  id: "abc-123",
  title: "Generate a marketing headline",
  prompt:
    "Write a catchy marketing headline for a SaaS that helps users automate workflows.",
  resultExample:
    "Automate Everything: The Smartest Way to Scale Your Productivity.",
  model: "gpt-4",
  tags: ["marketing", "copywriting", "saas"],
  pub_date: "2024-01-15T10:30:00Z",
  author: {
    id: "123-abc",
    username: "johndoe",
    email: "johndoe@example.com",
  },
};

describe("PromptForm", () => {
  describe("PromptForm creation mode", () => {
    afterEach(() => {
      cleanup();
    });

    it("renders without crashing", () => {
      renderWithProviders(<PromptForm mode="create" onSubmit={mockOnSubmit} />);

      expect(screen.getByLabelText(/title/i)).toBeDefined();
      expect(screen.getByLabelText(/prompt/i)).toBeDefined();
      expect(screen.getByLabelText(/result/i)).toBeDefined();
      expect(screen.getByLabelText(/tags/i)).toBeDefined();
      expect(screen.getByLabelText(/model/i)).toBeDefined();
      expect(screen.getByRole("button", { name: /share/i })).toBeDefined();
      expect(screen.getByRole("button", { name: /cancel/i })).toBeDefined();
    });

    it("call onSubmit function when it send a new prompt", async () => {
      renderWithProviders(<PromptForm mode="create" onSubmit={mockOnSubmit} />);
      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/title/i), mockPrompt.title);

      await user.type(screen.getByLabelText(/prompt/i), mockPrompt.prompt);

      await user.click(screen.getByLabelText(/tags/i));
      await user.click(screen.getByText(/marketing/i));

      await user.click(screen.getByLabelText(/model/i));
      await user.click(screen.getByText("GPT-4"));

      await user.type(
        screen.getByLabelText(/result/i),
        "Automate Everything: The Smartest Way to Scale Your Productivity"
      );

      await user.click(screen.getByRole("button", { name: /share/i }));

      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it("disable share button when isLoading paramther is false", async () => {
      renderWithProviders(
        <PromptForm mode="create" onSubmit={mockOnSubmit} isLoading={true} />
      );
      const button = screen.getByRole("button", { name: /share/i });
      expect(button.hasAttribute("disabled")).toBe(true);
    });
  });

  describe("PromptForm edit mode", () => {
    it("renders without crashing", () => {
      renderWithProviders(<PromptForm mode="edit" onSubmit={mockOnSubmit} />);

      expect(screen.getByLabelText(/title/i)).toBeDefined();
      expect(screen.getByLabelText(/prompt/i)).toBeDefined();
      expect(screen.getByLabelText(/result/i)).toBeDefined();
      expect(screen.getByLabelText(/tags/i)).toBeDefined();
      expect(screen.getByLabelText(/model/i)).toBeDefined();
      expect(
        screen.getByRole("button", { name: /save changes/i })
      ).toBeDefined();
      expect(screen.getByRole("button", { name: /delete/i })).toBeDefined();
      expect(screen.getByRole("button", { name: /cancel/i })).toBeDefined();
    });

    it("render all default values successfully", () => {
      renderWithProviders(
        <PromptForm
          mode="edit"
          onSubmit={vi.fn()}
          isLoading={false}
          defaultValues={mockPrompt}
        />
      );

      expect(screen.getByDisplayValue(mockPrompt.title)).toBeDefined();
      expect(screen.getByDisplayValue(mockPrompt.prompt)).toBeDefined();
      expect(screen.getByDisplayValue(mockPrompt.resultExample)).toBeDefined();
      expect(screen.getByDisplayValue(new RegExp(mockPrompt.model, "i")));

      mockPrompt.tags.forEach((tag: string) => {
        expect(screen.getByText(new RegExp(tag, "i"))).toBeDefined();
      });
    });

    it("disable action buttons when isLoading paramther is false", async () => {
      renderWithProviders(
        <PromptForm mode="edit" onSubmit={mockOnSubmit} isLoading={true} />
      );
      const saveButton = screen.getByRole("button", { name: /save changes/i });
      expect(saveButton.hasAttribute("disabled")).toBe(true);

      screen.debug();

      const deleteButton = screen.getByRole("button", { name: /delete/i });
      expect(deleteButton.hasAttribute("disabled")).toBe(true);
    });

    it("call onDelte function when delete button is clicked", async () => {
      renderWithProviders(
        <PromptForm
          mode="edit"
          onSubmit={mockOnSubmit}
          isLoading={false}
          onDelete={mockOnDelete}
        />
      );

      const user = userEvent.setup();
      const deleteButton = screen.getByRole("button", { name: /delete/i });
      await user.click(deleteButton);

      expect(mockOnDelete).toBeCalled();
    });
  });
});
