import { http, HttpResponse } from "msw";
import { prompts, users } from "../data/mocks";

export const userHandlers = [
  http.get("http://localhost:8000/users/me", async () => {
    return HttpResponse.json(users[0])
  }),
  http.get("http://localhost:8000/users/me/prompts", async () => {
    return HttpResponse.json(prompts)
  })
];
