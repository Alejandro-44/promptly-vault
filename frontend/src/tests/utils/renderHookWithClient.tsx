import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export function renderHookWithClient(callback: () => any) {
  const client = new QueryClient();

  return renderHook(callback, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={client}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    ),
  });
}
