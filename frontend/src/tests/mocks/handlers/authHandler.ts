import type { User } from "@/types/api";
import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("http://localhost:8000/auth/register", async ({ request }) => {
    const body = await request.json() as User;
    if (body.email === "test@example.com") {
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
    return HttpResponse.json({ detail: "Invalid" }, { status: 400 });
  }),
];
