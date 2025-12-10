import { http, HttpResponse } from "msw";
import { prompts, users } from "../data/mocks";

export const userHandlers = [
  http.get("http://127.0.0.1:8000/users/me", async () => {
    return HttpResponse.json(users[0])
  }),
  http.get("http://127.0.0.1:8000/users/me/prompts", async () => {
    return HttpResponse.json(prompts.filter(prompt => prompt.user_id === "1"))
  }),
  http.delete("http://127.0.0.1:8000/users/me", async () => {
    return HttpResponse.json({}, { status: 204 });
  }),
  http.get<{ id: string }>("http://127.0.0.1:8000/users/:id", async ({ params }) => {
    return HttpResponse.json(users.find(user => user.id === params.id))
  }),
];
