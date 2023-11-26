import { QueryClient } from "@tanstack/react-query";

export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});
