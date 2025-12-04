import type { User } from "@/types/api";
import { delay, http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("http://127.0.0.1:8000/auth/register", async ({ request }) => {
    await delay(150);
    const body = (await request.json()) as User;
    if (body.email !== "fail@example.com") {
      return HttpResponse.json(
        {
          id: "1",
          username: body.username,
          email: body.email,
          is_active: true,
        },
        { status: 201 }
      );
    }
    return HttpResponse.json(
      { detail: "Email already registered" },
      { status: 409 }
    );
  }),
  http.post("http://127.0.0.1:8000/auth/login", async ({ request }) => {
    await delay(150);
    const body = (await request.json()) as User;
    if (body.email !== "fail@example.com") {
      return HttpResponse.json(
        {
          token_type: "bearer",
          access_token: "mockedtoken",
        },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      { detail: "Invalid credentials" },
      { status: 401 }
    );
  }),
];
