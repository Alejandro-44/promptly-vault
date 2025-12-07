import type { PromptDTO } from "./prompts.dto";
import type { Prompt } from "./prompts.model";

export const promptsMapper = {
    toPrompt: (dto: PromptDTO): Prompt => ({
    id: dto.id,
    title: dto.title,
    prompt: dto.prompt,
    resultExample: dto.result_example,
    model: dto.model,
    tags: dto.tags,
    userId: dto.user_id,
    pubDate: new Date(dto.pub_date),
  }),
}
