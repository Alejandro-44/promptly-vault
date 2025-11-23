import { getCurrentUser } from "./getCurrentUser"

describe("Get current user", () => {
  it("Should get current user data", async () => {
    const user = await getCurrentUser();

    expect(user.username).toBe("johndoe");
    expect(user.email).toBe("johndoe@example.com");
    expect(user.is_active).toBe(true);
  })
})
