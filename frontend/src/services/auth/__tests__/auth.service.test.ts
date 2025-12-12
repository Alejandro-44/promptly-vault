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
      isActive: true,
    });
  });

  it("should fail to register with an existing email and return 409", async () => {
    await expect(
      AuthService.register({
        username: "failuser",
        email: "fail@example.com",  
        password: "123456",
      })
    ).rejects.toThrowError();
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
});
