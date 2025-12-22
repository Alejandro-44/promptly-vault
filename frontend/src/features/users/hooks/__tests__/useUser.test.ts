import { useUserStore } from "../../contexts";
import { renderHookWithClient } from "@/tests/utils/renderHookWithClient";
import { useUser } from "../useUser";
import { waitFor } from "@testing-library/react";

describe("useUser", () => {
  afterEach(() => {
    useUserStore.setState({ user: null, isAuthenticated: false });
  });

  it("returns the authenticated user when mode is 'me'", () => {
    const mockUser = {
      id: "123-abc",
      username: "johndoe",
      isActive: true,
    } as any;

    useUserStore.setState({ user: mockUser, isAuthenticated: true, isLoading: false });

    const { result } = renderHookWithClient(() => useUser({ mode: "me" }));

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("returns loading state when mode is 'me' and auth is loading", () => {
    useUserStore.setState({ user: null, isAuthenticated: false, isLoading: true });

    const { result } = renderHookWithClient(() => useUser({ mode: "me" }));

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("fetches and returns public user when mode is 'public' and userId is provided", async () => {
    const { result } = renderHookWithClient(() =>
      useUser({ mode: "public", userId: "123-abc" })
    );

    await waitFor(() => {
      expect(result.current.user).toBeDefined();
    });

    expect(result.current.user?.username).toBe("johndoe");
    expect(result.current.user?.id).toBe("123-abc");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("does not fetch when mode is 'public' and userId is not provided", () => {
    const { result } = renderHookWithClient(() =>
      useUser({ mode: "public" })
    );

    expect(result.current.user).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
