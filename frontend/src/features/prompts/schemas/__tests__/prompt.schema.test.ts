import { promptSchema } from "../prompt.schema";

describe("promptSchema", () => {
  it("successfully validates a valid record", () => {
    const data = {
      title: "Test Prompt",
      prompt: "This is a test prompt with at least 10 characters",
      result_example: "This is a result example with at least 10 characters",
      model: "gpt-4",
      tags: ["tag1", "tag2"],
    };

    const result = promptSchema.safeParse(data);

    expect(result.success).toBe(true);
  });

  describe("title validation", () => {
    it("returns an error if title is less than 3 characters", () => {
      const result = promptSchema.safeParse({
        title: "Hi",
        prompt: "This is a test prompt with at least 10 characters",
        result_example: "This is a result example with at least 10 characters",
        model: "gpt-4",
        tags: ["tag1"],
      });

      expect(result.success).toBe(false);

      const errors = (result as any).error.flatten().fieldErrors;

      expect(errors.title?.[0]).toBe("Title must be at least 3 characters");
    });

    it("returns an error if title is more than 100 characters", () => {
      const longTitle = "a".repeat(101);
      const result = promptSchema.safeParse({
        title: longTitle,
        prompt: "This is a test prompt with at least 10 characters",
        result_example: "This is a result example with at least 10 characters",
        model: "gpt-4",
        tags: ["tag1"],
      });

      expect(result.success).toBe(false);

      const errors = (result as any).error.flatten().fieldErrors;

      expect(errors.title?.[0]).toBe("Maximum 100 characters");
    });
  });

  it("returns an error if prompt is less than 10 characters", () => {
    const result = promptSchema.safeParse({
      title: "Test Prompt",
      prompt: "Short",
      result_example: "This is a result example with at least 10 characters",
      model: "gpt-4",
      tags: ["tag1"],
    });

    expect(result.success).toBe(false);

    const errors = (result as any).error.flatten().fieldErrors;

    expect(errors.prompt?.[0]).toBe("Prompt must be at least 10 characters");
  });

  it("returns an error if result_example is less than 10 characters", () => {
    const result = promptSchema.safeParse({
      title: "Test Prompt",
      prompt: "This is a test prompt with at least 10 characters",
      result_example: "Short",
      model: "gpt-4",
      tags: ["tag1"],
    });

    expect(result.success).toBe(false);

    const errors = (result as any).error.flatten().fieldErrors;

    expect(errors.result_example?.[0]).toBe("Result example must be at least 10 characters");
  });

  it("returns an error if model is empty", () => {
    const result = promptSchema.safeParse({
      title: "Test Prompt",
      prompt: "This is a test prompt with at least 10 characters",
      result_example: "This is a result example with at least 10 characters",
      model: "",
      tags: ["tag1"],
    });

    expect(result.success).toBe(false);

    const errors = (result as any).error.flatten().fieldErrors;

    expect(errors.model?.[0]).toBe("Select a model");
  });

  describe("tags validation", () => {
    it("returns an error if tags array is empty", () => {
      const result = promptSchema.safeParse({
        title: "Test Prompt",
        prompt: "This is a test prompt with at least 10 characters",
        result_example: "This is a result example with at least 10 characters",
        model: "gpt-4",
        tags: [],
      });

      expect(result.success).toBe(false);

      const errors = (result as any).error.flatten().fieldErrors;

      expect(errors.tags?.[0]).toBe("Add at least one tag");
    });

    it("returns an error if any tag is empty string", () => {
      const result = promptSchema.safeParse({
        title: "Test Prompt",
        prompt: "This is a test prompt with at least 10 characters",
        result_example: "This is a result example with at least 10 characters",
        model: "gpt-4",
        tags: ["tag1", ""],
      });

      expect(result.success).toBe(false);

      const errors = (result as any).error.flatten().fieldErrors;

      expect(errors.tags?.[0]).toBe("Add at least one tag");
    });
  });
});
