import { OAuthButtons } from "@/features/authentication/components/OAuthButtons";
import React from "react";

function SignInPage() {
  return (
    <div className="flex flex-col min-h-svh items-center justify-center">
      <OAuthButtons />
    </div>
  );
}

export default SignInPage;
