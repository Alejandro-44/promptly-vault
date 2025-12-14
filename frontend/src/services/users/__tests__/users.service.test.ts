import { UsersService } from "../users.service";

describe("UsersService", () => {
  it("should get the current logged user", async () => {
    const user = await UsersService.getMe();
    expect(user).toEqual({
      id: "1",
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
    const user = await UsersService.getUserById("2");

    expect(user).toEqual({
      id: "2",
      username: "janedoe",
      isActive: true,
    });
  });
});
