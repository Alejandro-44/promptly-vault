import { PromptsService } from "../prompts.service";

describe("PromptsService", () => {
  it("should get all prompts successfully", async () => {
    const prompts = await PromptsService.getAllPrompts();
    expect(prompts).toHaveLength(3);
    expect(prompts[0]).toEqual({
      id: "abc-123",
      title: "Generate a marketing headline",
      model: "gpt-4",
      tags: ["marketing", "copywriting", "saas"],
      authorId: "123-abc",
      authorName: "johndoe",
      pubDate: new Date("2024-01-15T10:30:00Z"),
    });
  });

  it("should return prompt details with correct types", async () => {
    const mockPromptId = "abc-123";
    const prompt = await PromptsService.getPromptDetail(mockPromptId);

    expect(prompt).toEqual({
      id: "abc-123",
      title: "Generate a marketing headline",
      prompt:
        "Write a catchy marketing headline for a SaaS that helps users automate workflows.",
      resultExample:
        "Automate Everything: The Smartest Way to Scale Your Productivity.",
      model: "gpt-4",
      tags: ["marketing", "copywriting", "saas"],
      pubDate: new Date("2024-01-15T10:30:00Z"),
      author: {
        id: "123-abc",
        username: "johndoe",
        email: "johndoe@example.com",
      },
    });
  });

  it("should resturn successful message and id when create a new prompt successfully", async () => {
    const mocksPromptCreate = {
      title: "Integration test",
      prompt: "Write a poem",
      resultExample: "A small poem",
      model: "Claude",
      tags: ["ai", "poem"],
    };

    const response = await PromptsService.createPrompt(mocksPromptCreate);

    expect(response).toHaveProperty("message")
    expect(response).toHaveProperty("id", "mockedid789456")
  });
});
