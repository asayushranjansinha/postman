import { redirect } from "next/navigation";
import React from "react";

import { getAuth } from "@/utils/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuth();
  if (session) return redirect("/");

  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
}
