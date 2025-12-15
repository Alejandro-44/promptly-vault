import { useUserStore } from "@/features/users/contexts";
import { UsersService } from "@/services";

export async function rootLoader() {
  console.log("Running rootLoader to fetch user data");
  try {
    const user = await UsersService.getMe();
    useUserStore.getState().setUser(user);
  } catch (error) {
    useUserStore.getState().clearUser();
  }
}
