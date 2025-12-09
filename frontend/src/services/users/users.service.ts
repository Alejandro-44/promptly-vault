import { httpClient } from "../api/httpClient";
import type { UserDTO } from "./users.dto";
import type { User } from "./users.model";
import { userMapper } from "./users.mapper";
import type { Prompt } from "../prompts/prompts.model";
import type { PromptDTO } from "../prompts/prompts.dto";
import { promptsMapper } from "../prompts/prompts.mapper";

export class UsersService {
  static async getMe(): Promise<User> {
    const data = await httpClient.get<UserDTO>("/users/me");
    return userMapper.toUser(data);
  }

  static async deleteMe(): Promise<void> {
    await httpClient.delete("/users/me");
  }

  static async getMyPrompts(): Promise<Prompt[]> {
    const data = await httpClient.get<PromptDTO[]>("/users/me/prompts");
    return data.map(promptsMapper.toPrompt);
  }

  static async getUserById(userId: string): Promise<User> {
    const data = await httpClient.get<UserDTO>(`/users/${userId}`);
    return userMapper.toUser(data);
  }
}
