import { httpClient } from "../api/httpClient";
import type { UserDTO } from "./users.dto";
import type { User } from "./users.model";
import { userMapper } from "./users.mapper";
import type { Prompt, PromptSummary } from "../prompts/prompts.model";
import type { PromptDTO, PromptSummaryDTO } from "../prompts/prompts.dto";
import { promptsMapper, promptSummaryMapper } from "../prompts/prompts.mapper";

export class UsersService {
  static async getMe(): Promise<User> {
    const data = await httpClient.get<UserDTO>("/users/me");
    return userMapper.toUser(data);
  }

  static async deleteMe(): Promise<void> {
    await httpClient.delete("/users/me");
  }

  static async getMyPrompts(): Promise<PromptSummary[]> {
    const data = await httpClient.get<PromptSummaryDTO[]>("/users/me/prompts");
    return data.map(promptSummaryMapper.toPromptSummary);
  }

  static async getUserById(userId: string): Promise<User> {
    const data = await httpClient.get<UserDTO>(`/users/${userId}`);
    return userMapper.toUser(data);
  }
}
