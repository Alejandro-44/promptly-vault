import type { UserDTO } from "./users.dto";
import type { User } from "./users.model";

export const userMapper = {
  toUser: (dto: UserDTO): User => ({
    id: dto.id,
    username: dto.username,
    email: dto.email,
    isActive: dto.is_active,
  }),
};
