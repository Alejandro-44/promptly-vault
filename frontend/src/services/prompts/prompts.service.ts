import { httpClient } from "../api/httpClient";
import type { PromptDTO, PromptSummaryDTO } from "./prompts.dto";
import type { Prompt, PromptSummary } from "./prompts.model";
import { promptMapper, promptSummaryMapper } from "./prompts.mapper";

export class PromptsService {
  static async getAllPrompts(): Promise<PromptSummary[]> {
    const data = await httpClient.get<PromptSummaryDTO[]>("/prompts/");
    return data.map(promptSummaryMapper.toPromptSummary);
  }

  static async getPromptDetail(id: string): Promise<Prompt> {
    const data = await httpClient.get<PromptDTO>(`/prompts/${id}`);
    return promptMapper.toPrompt(data);
  }
}
