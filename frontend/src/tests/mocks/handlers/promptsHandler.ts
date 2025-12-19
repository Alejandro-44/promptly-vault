import { http, HttpResponse } from "msw";
import { promptMocks, promptSummaryMocks } from "../data/mocks";
import type { PromptCreateDTO } from "@/services/prompts/prompts.dto";

export const promptsHandlers = [
  http.get("http://127.0.0.1:8000/prompts/", async () => {
    return HttpResponse.json(promptSummaryMocks);
  }),
  http.get<{ id: string }>(
    "http://127.0.0.1:8000/prompts/:id",
    ({ params }) => {
      const { id } = params;
      const prompt = promptMocks.find((prompt) => prompt.id === id);
      if (!prompt) {
        return HttpResponse.json(
          { message: "Prompt not found" },
          { status: 404 }
        );
      }
      return HttpResponse.json(prompt);
    }
  ),
  http.post<{}, PromptCreateDTO>(
    "http://127.0.0.1:8000/prompts/",
    async ({ request }) => {
      const prompt = await request.json();

      if (!prompt.title || !prompt.prompt || !prompt.model) {
        return HttpResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }

      if (prompt.tags && !Array.isArray(prompt.tags)) {
        return HttpResponse.json(
          { message: "Tags must be an array" },
          { status: 400 }
        );
      }

      return HttpResponse.json(
        {
          message: "Prompt created sucessfully",
          id: "mockedid789456",
        },
        { status: 201 }
      );
    }
  ),
];
