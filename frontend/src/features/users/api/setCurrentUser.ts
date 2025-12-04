import { apiClient } from "@/lib/apiClient";
import { useUserStore } from "../contexts";

export async function setCurrentUser() {
  try {
    const { data } = await apiClient.get("/users/me");
    useUserStore.getState().setUser(data);
  } catch (error) {
    useUserStore.getState().clearUser();
  }
}
