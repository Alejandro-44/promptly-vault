import { renderHookWithClient } from "@/tests/utils/renderHookWithClient";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useUserStore } from "@/features/users/contexts";
import { waitFor } from "@testing-library/react";

describe("useLogin", () => {
  afterEach(() => {
    useUserStore.setState({ user: null });
  });

  it("should login and populate Zustand with user data", async () => {
    const { result } = renderHookWithClient(() => useLogin());

    result.current.mutate({
      email: "johndoe@example.com",
      password: "123",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const user = useUserStore.getState().user;

    expect(user).toEqual({
      id: "1",
      username: "johndoe",
      email: "johndoe@example.com",
      is_active: true,
    });
  });

  it("should handle login errors", async () => {
    const { result } = renderHookWithClient(() => useLogin());

    result.current.mutate({
      email: "fail@example.com",
      password: "wrong",
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(useUserStore.getState().user).toBe(null);
  });
});
