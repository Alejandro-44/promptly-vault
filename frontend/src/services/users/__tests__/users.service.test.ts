import { UsersService } from "../users.service";

describe("UsersService", () => {
  it("should get the current logged user", async () => {
    const user = await UsersService.getMe();
    expect(user).toEqual({
      id: "123-abc",
      username: "johndoe",
      isActive: true,
    });
  });

  it("should delete the current logged user", async () => {
    await expect(UsersService.deleteMe()).resolves.toBeUndefined();
  });

  it("should get the current user's prompts", async () => {
    const prompts = await UsersService.getMyPrompts();
    expect(prompts).toHaveLength(3);
  });

  it("should get a user by ID", async () => {
    const user = await UsersService.getUserById("456-def");

    expect(user).toEqual({
      id: "456-def",
      username: "alex",
      isActive: true,
    });
  });
  it("should get a user's prompts by user ID", async () => {
    const prompts = await UsersService.getUserPrompts("123-abc");
    expect(prompts).toHaveLength(3);
  });
});
