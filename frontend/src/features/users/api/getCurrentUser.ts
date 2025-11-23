import { apiClient } from "@/lib/apiClient";
import type { User } from "@/types/api";

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get("/users/me");
  return response.data;
}
