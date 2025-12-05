import { getCurrentUser } from "@/features/users/api/getCurrentUser";
import { useUserStore } from "@/features/users/contexts";

export async function rootLoader() {
  try {
    const user = await getCurrentUser();
    useUserStore.getState().setUser(user);
  } catch (error) {
    useUserStore.getState().clearUser();
  }
}
