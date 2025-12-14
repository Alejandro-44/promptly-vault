import type { PromptDTO, PromptSummaryDTO } from "./prompts.dto";
import type { Prompt, PromptSummary } from "./prompts.model";

export const promptMapper = {
  toPrompt: (dto: PromptDTO): Prompt => ({
    id: dto.id,
    title: dto.title,
    prompt: dto.prompt,
    resultExample: dto.result_example,
    model: dto.model,
    tags: dto.tags,
    pubDate: new Date(dto.pub_date),
    author: {
      id: dto.author.id,
      username: dto.author.username,
      email: dto.author.email,
    },
  }),
};

export const promptSummaryMapper = {
  toPromptSummary: (dto: PromptSummaryDTO): PromptSummary => ({
    id: dto.id,
    title: dto.title,
    tags: dto.tags,
    model: dto.model,
    pubDate: new Date(dto.pub_date),
    authorName: dto.author_name,
  }),
};
