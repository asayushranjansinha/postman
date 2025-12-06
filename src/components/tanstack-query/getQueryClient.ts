import {
    isServer,
    QueryClient
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserClient: QueryClient | undefined = undefined;

export function getBrowserClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserClient) {
      browserClient = makeQueryClient();
    }
    return browserClient;
  }
}
