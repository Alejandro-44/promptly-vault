import { authHandlers } from "./authHandler"
import { userHandlers } from "./usersHandler"


export const handlers = [
  ...authHandlers,
  ...userHandlers
]
