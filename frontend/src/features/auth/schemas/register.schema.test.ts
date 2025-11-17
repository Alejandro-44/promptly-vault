import { describe, it, expect } from "vitest";
import { registerSchema } from "./register.schema";

describe("registerSchema", () => {
  it("successfully validates a valid record", () => {
    const data = {
      username: "john",
      email: "john@example.com",
      password: "1234568910",
    };

    const result = registerSchema.safeParse(data);

    expect(result.success).toBe(true);
  });

  it("returns an error if the fields are empty", () => {
    const result = registerSchema.safeParse({
      username: "",
      email: "",
      password: "",
    });

    expect(result.success).toBe(false);

    const errors = (result as any).error.flatten().fieldErrors;

    expect(errors.username?.[0]).toBe("The username is required");
    expect(errors.email?.[0]).toBe("The email is required");
    expect(errors.password?.[0]).toBe("The password is required");
  });

  it("retorna error si el email es inválido", () => {
    const result = registerSchema.safeParse({
      username: "john",
      email: "not-an-email",
      password: "123456",
    });

    expect(result.success).toBe(false);

    const errors = (result as any).error.flatten().fieldErrors;
    expect(errors.email?.[0]).toBe("Invalid email address");
  });

  it("retorna error si la contraseña es demasiado corta", () => {
    const result = registerSchema.safeParse({
      username: "john",
      email: "john@example.com",
      password: "123",
    });

    expect(result.success).toBe(false);

    const errors = (result as any).error.flatten().fieldErrors;
    expect(errors.password?.[0]).toBe(
      "The password must be at least 8 characters long"
    );
  });
});
