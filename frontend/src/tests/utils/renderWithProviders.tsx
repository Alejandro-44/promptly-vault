import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

export function renderWithProviders(ui: React.ReactNode, initialEntries: string[] = ["/test"]) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/test" element={ui} />
          <Route path="/prompts/:id" element={<div>Prompt detail</div>} />
          <Route path="/users/:id" element={<div>Author page</div>} />
          <Route path="/login" element={<div>Login page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/private" element={<div>Private Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}
