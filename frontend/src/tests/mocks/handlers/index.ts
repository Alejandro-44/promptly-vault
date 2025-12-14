import { authHandlers } from "./authHandler"
import { userHandlers } from "./usersHandler"
import { promptsHandlers } from "./promptsHandler"


export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...promptsHandlers
]
