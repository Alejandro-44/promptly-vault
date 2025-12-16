import { renderHookWithClient } from "@/tests/utils/renderHookWithClient";
import { usePrompts } from "../usePrompts";
import { waitFor } from "@testing-library/react";

describe("usePrompts", () => {
  it("should fetch and return prompts successfully", async () => {
    const { result } = renderHookWithClient(() => usePrompts());

    expect(result.current.prompts).toBeUndefined();

    await waitFor(() => {
      expect(result.current.prompts).toBeDefined();
    });

    // Assert the fetched data matches the mocked response
    expect(result.current.prompts).toEqual([
      {
        id: "abc-123",
        title: "Generate a marketing headline",
        model: "gpt-4",
        tags: ["marketing", "copywriting", "saas"],
        authorId: "123-abc",
        authorName: "johndoe",
        pubDate: new Date("2024-01-15T10:30:00Z"),
      },
      {
        id: "def-456",
        title: "Refactor JavaScript Code",
        model: "gpt-4o",
        tags: ["javascript", "refactor", "programming"],
        authorId: "123-abc",
        authorName: "johndoe",
        pubDate: new Date("2024-02-02T16:45:00Z"),
      },
      {
        id: "ghi-789",
        title: "Character backstory generator",
        model: "gpt-3.5",
        tags: ["storytelling", "writing", "fantasy"],
        authorId: "123-abc",
        authorName: "johndoe",
        pubDate: new Date("2024-02-10T08:12:00Z"),
      },
    ]);
  });
});
