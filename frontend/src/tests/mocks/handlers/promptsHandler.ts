import { http, HttpResponse } from "msw";
import { promptMocks, promptSummaryMocks } from "../data/mocks";

export const promptsHandlers = [
  http.get("http://127.0.0.1:8000/prompts/", async () => {
    return HttpResponse.json(promptSummaryMocks)
  }),
  http.get<{ id: string }>("http://127.0.0.1:8000/prompts/:id", ({ params }) => {
    const { id } = params;
    const prompt = promptMocks.find((prompt) => prompt.id === id);
    if (!prompt) {
      return HttpResponse.json({ message: "Prompt not found" }, { status: 404 });
    }
    return HttpResponse.json(prompt)
  })
]
