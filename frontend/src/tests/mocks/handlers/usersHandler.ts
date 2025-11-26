import { http, HttpResponse } from "msw";
import { prompts } from "../data/mocks";

export const userHandlers = [
  http.get("http://localhost:8000/users/me", async () => {
    return HttpResponse.json({
      username: "johndoe",
      email: "johndoe@example.com",
      is_active: true,
    })
  }),
  http.get("http://localhost:8000/users/me/prompts", async () => {
    return HttpResponse.json(prompts)
  })
];
