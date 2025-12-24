import { renderHookWithClient } from "@/tests/utils/renderHookWithClient";
import { useUserPrompts } from "../useUserPrompts";
import { waitFor } from "@testing-library/react";

describe("useUserPrompts", () => {
  it("fetches and returns current user's prompts when mode is 'me'", async () => {
    const { result } = renderHookWithClient(() =>
      useUserPrompts({ mode: "me" })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.prompts).toHaveLength(3);
    expect(result.current.prompts?.[0].title).toBe("Generate a marketing headline");
    expect(result.current.error).toBeNull();
  });

  it("fetches and returns user's prompts when mode is 'public' and userId is provided", async () => {
    const { result } = renderHookWithClient(() =>
      useUserPrompts({ mode: "public", userId: "123-abc" })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.prompts).toHaveLength(3);
    expect(result.current.error).toBeNull();
  });

  it("returns empty prompts when mode is 'public' and userId has no prompts", async () => {
    const { result } = renderHookWithClient(() =>
      useUserPrompts({ mode: "public", userId: "456-def" })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.prompts).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });

  it("does not fetch when mode is 'public' and userId is not provided", () => {
    const { result } = renderHookWithClient(() =>
      useUserPrompts({ mode: "public" })
    );

    expect(result.current.prompts).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });
});
