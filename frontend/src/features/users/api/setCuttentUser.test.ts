// setCurrentUser.test.ts
import { describe, it, expect } from "vitest";
import { setCurrentUser } from "./setCurrentUser";
import { useUserStore } from "../contexts";

describe("setCurrentUser", () => {
  afterEach(() => {
    useUserStore.setState({ user: null });
  });

  it("should fetch /users/me and store user in Zustand", async () => {
    await setCurrentUser();

    const user = useUserStore.getState().user;

    expect(user).toEqual({
      id: "1",
      username: "johndoe",
      email: "johndoe@example.com",
      is_active: true,
    });
  });
});
