import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

export function RegisterPage() {
  const { mutate, isSuccess, isPending, error } = useRegister();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" aria-label="username" value={form.username} onChange={handleChange} />
        </label>
        <label>
          Email
          <input name="email" aria-label="email" type="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          Password
          <input name="password" aria-label="password" type="password" value={form.password} onChange={handleChange} />
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? "Cargando..." : "Registrarse"}
        </button>
      </form>

      {isSuccess && <p>Registro exitoso</p>}
      {error && <p>Error: {(error as Error).message}</p>}
    </div>
  );
}
