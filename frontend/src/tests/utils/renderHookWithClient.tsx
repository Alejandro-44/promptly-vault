import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, type RenderHookOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export function renderHookWithClient<Props, Result>(
  callback: (props: Props) => Result,
  options?: RenderHookOptions<Props>
) {

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return renderHook(callback, {
    ...options,
    wrapper: ({ children }) => (
      <QueryClientProvider client={client}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    ),
  });
}
