import { describe, it, expect } from "vitest";

import { loginUser } from "./login";

describe("loginUser", () => {
  it("should return token in successful case", async () => {
    const result = await loginUser({
      email: "test@example.com",
      password: "123456",
    });

    expect(result.access_token).toBe("mockedtoken");
  });

  it("should returns ", async () => {
    await expect(
      loginUser({ email: "fail@example.com", password: "wrongpass" })
    ).rejects.toThrowError();
  });
});
