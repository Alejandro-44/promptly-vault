import { setupServer } from "msw/node";
import { authHandlers } from "./handlers/authHandler";

export const server = setupServer(...authHandlers);
