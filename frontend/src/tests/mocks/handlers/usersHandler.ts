import { http, HttpResponse } from "msw";
import { prompts, users } from "../data/mocks";

export const userHandlers = [
  http.get("http://127.0.0.1:8000/users/me", async () => {
    return HttpResponse.json(users[0])
  }),
  http.get("http://127.0.0.1:8000/users/me/prompts", async () => {
    return HttpResponse.json(prompts)
  }),
  http.delete("http://127.0.0.1:8000/users/me", async () => {
    return HttpResponse.json({}, { status: 204 });
  }),
  http.get("http://127.0.0.1:8000/users/2", async () => {
    return HttpResponse.json(users[1])
  }),
];
