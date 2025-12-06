import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000", // TODO: somehow fix it later - it doesn't work for env var
});

export const { signIn, signOut, useSession } = authClient;
