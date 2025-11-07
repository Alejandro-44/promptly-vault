import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/">Inicio</Link>
        <Link to="/register">Registro</Link>
      </nav>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
