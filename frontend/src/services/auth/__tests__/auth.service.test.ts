import { AuthService } from "../auth.service";

describe("AuthService", () => {
  it("should register a user", async () => {
    const newUser = await AuthService.register({
      username: "testuser",
      email: "test@example.com",
      password: "123456",
    });

    expect(newUser).toEqual({
      id: "1",
      username: "testuser",
      email: "test@example.com",
      isActive: true,
    });
  });

  it("should login and return a token", async () => {
    const token = await AuthService.login({
      email: "test@example.com",
      password: "123456",
    });

    expect(token).toEqual({
      accessToken: "mockedtoken",
      tokenType: "bearer",
    });
  });

  it("should get the current logged user", async () => {
    const user = await AuthService.getMe();

    expect(user).toEqual({
      id: "1",
      username: "johndoe",
      email: "johndoe@example.com",
      isActive: true,
    });
  });
});
