import { redirect } from "next/navigation";
import React from "react";

import { requireAuth } from "@/utils/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await requireAuth();
  if (isAuthenticated) return redirect("/");

  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
}
