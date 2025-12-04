import { apiClient } from "@/lib/apiClient";

export async function logoutUser() {
  await apiClient.post("/auth/logout");
}
