import { cleanup, screen } from "@testing-library/react";
import { PromptTags } from "../PromptTags";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

describe("PromptTags", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render tags as chips", () => {
    const tags = ["marketing", "copywriting", "saas"];
    renderWithProviders(<PromptTags tags={tags} />);

    tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeDefined();
    });

    const chips = screen.getAllByRole("tag");
    expect(chips).toHaveLength(tags.length);
  });

  test("should render empty when no tags", () => {
    const tags: string[] = [];
    renderWithProviders(<PromptTags tags={tags} />);

    const chips = screen.queryAllByRole("button");
    expect(chips).toHaveLength(0);
  });
});
