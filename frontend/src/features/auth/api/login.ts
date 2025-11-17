import { apiClient } from "@/lib/apiClient";
import type { TokenResponse, UserLogin } from "@/types/api";

export async function loginUser(data: UserLogin): Promise<TokenResponse> {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
}
