import Link from "next/link";

import { OAuthButtons } from "@/features/authentication/components/OAuthButtons";

const LoginPage = () => {
  return (
    <section className="flex min-h-screen px-4 py-16 md:py-32 ">
      <div className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)] ">
        <div className="p-8 pb-6">
          <div>
            <Link href={"/"}>
              <h1 className="text-2xl font-bold">Postman</h1>
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Sign in to PostMan
            </h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <OAuthButtons />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
