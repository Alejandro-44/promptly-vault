import { http, HttpResponse } from "msw";
import { promptSummaryMocks, users } from "../data/mocks";

export const userHandlers = [
  http.get("http://127.0.0.1:8000/users/me", async () => {
    return HttpResponse.json(users[0])
  }),
  http.get("http://127.0.0.1:8000/users/me/prompts", async () => {
    return HttpResponse.json(promptSummaryMocks.filter(prompt => prompt.author_name === "johndoe"))
  }),
  http.delete("http://127.0.0.1:8000/users/me", async () => {
    return HttpResponse.json({}, { status: 204 });
  }),
  http.get<{ id: string }>("http://127.0.0.1:8000/users/:id", async ({ params }) => {
    return HttpResponse.json(users.find(user => user.id === params.id))
  }),
  http.get<{ id: string }>("http://127.0.0.1:8000/users/:id/prompts", async ({ params }) => {
    return HttpResponse.json(promptSummaryMocks.filter(prompt => prompt.author_id === params.id))
  }),
];
