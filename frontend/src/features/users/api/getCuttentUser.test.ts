// setCurrentUser.test.ts
import { describe, it, expect } from "vitest";
import { getCurrentUser } from "./getCurrentUser";
import { useUserStore } from "../contexts";

describe("getCurrentUser", () => {
  afterEach(() => {
    useUserStore.setState({ user: null });
  });

  it("should fetch /users/me and return the user data", async () => {
    const user = await getCurrentUser();

    expect(user).toEqual({
      id: "1",
      username: "johndoe",
      email: "johndoe@example.com",
      is_active: true,
    });
  });
});
