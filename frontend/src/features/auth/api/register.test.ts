import { describe, it, expect } from "vitest";

import { registerUser } from "./register"

describe("registerUser", () => {
  it("devuelve el token cuando la API responde correctamente", async () => {
    const result = await registerUser({
      username: "test",
      email: "test@example.com",
      password: "123456",
    });

    expect(result.username).toBe("test");
    expect(result.email).toBe("test@example.com");
    expect(result.is_active).toBe(true);
    expect(result.id).toBe("1");
  });

  it("lanza un error cuando la API devuelve 401", async () => {
    await expect(
      registerUser({ username: "failuser", email: "fail@example.com", password: "wrongpass" })
    ).rejects.toThrowError();
  });
});
