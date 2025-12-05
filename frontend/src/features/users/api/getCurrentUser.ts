import { apiClient } from "@/lib/apiClient";
import type { User } from "@/types/api";

export async function getCurrentUser(): Promise<User> {
  const { data } = await apiClient.get("/users/me");
  return data;
}
