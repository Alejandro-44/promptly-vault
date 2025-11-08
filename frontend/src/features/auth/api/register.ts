import { apiClient } from "@/lib/apiClient";
import type { UserCreate, User } from "@/types/api";

export async function registerUser(data: UserCreate): Promise<User> {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
}
