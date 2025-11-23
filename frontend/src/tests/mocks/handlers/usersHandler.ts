import { http, HttpResponse } from "msw";

export const userHandlers = [
  http.get("http://localhost:8000/users/me", async () => {
    return HttpResponse.json({
      username: "johndoe",
      email: "johndoe@example.com",
      is_active: true,
    })
  })
];
