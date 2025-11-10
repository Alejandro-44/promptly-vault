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
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <h1 className="text-xl mb-4 font-semibold">Registro</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="username"
          aria-label="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="email"
          aria-label="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          type="email"
          className="border p-2 rounded"
        />
        <input
          name="password"
          aria-label="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          type="password"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {isPending ? "Cargando..." : "Registrarse"}
        </button>
      </form>

      {isSuccess && <p className="text-green-600 mt-4">Registro exitoso</p>}
      {error && (
        <p className="text-red-600 mt-4">
          {(error as any)?.response?.data?.detail || "Error inesperado"}
        </p>
      )}
    </div>
  );
}
