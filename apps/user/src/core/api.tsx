import type { AppRouter } from "@repo/api-types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type FC, type PropsWithChildren } from "react";

export const api = createTRPCReact<AppRouter>();

// caching is disabled by default, but individual queries can opt-in if needed
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
      staleTime: 0,
    },
  },
});

export const trpcClient = api.createClient({
  links: [
    loggerLink(),
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

export const ApiProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};
