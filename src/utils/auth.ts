"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

/**
 * Gets the current session for a server-side request.
 *
 * @returns A Promise that resolves to the session object (with user) or null if not authenticated.
 */
export async function getAuth() {
  const header = await headers();
  const session = await auth?.api?.getSession({
    headers: header,
  });
  
  return session && session.user ? session : null;
}

/**
 * Checks if the user is authenticated for a server-side request.
 *
 * - Returns `true` if a session exists and has a user.
 * - Redirects to `redirectPath` if unauthenticated.
 *
 * @param redirectPath - Optional. Path to redirect unauthenticated users. Defaults to "/sign-in".
 * @returns A Promise that resolves to `true` if authenticated, or never returns (redirect occurs) if unauthenticated.
 */
export async function requireAuth(
  redirectPath: string = "/sign-in"
): Promise<boolean> {
  const session = await getAuth();
  
  if (!session) {
    redirect(redirectPath);
    return false;
  }
  
  return true;
}