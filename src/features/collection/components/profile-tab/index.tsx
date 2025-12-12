"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "@/lib/auth-client";
import {
  CheckCircleIcon,
  FingerprintIcon,
  LogOutIcon,
  MailIcon,
  ShieldIcon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ProfileTab = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 text-center">
        <ShieldIcon className="size-8 text-muted-foreground mb-4" />
        <p className="text-sm font-medium text-foreground">Not Authenticated</p>
        <p className="text-xs text-muted-foreground mt-1">
          Please sign in to manage your profile.
        </p>
      </div>
    );
  }

  const displayName =
    user.name?.split("@")[0] || user.email.split("@")[0] || "User";
  const initial = displayName[0].toUpperCase();

  async function onLogout() {
    const res = await signOut();
    if (res?.error) {
      toast.error("Failed to log out", { description: res.error.message });
    } else {
      toast.success("Logged out successfully");
    }
    router.push("/sign-in");
  }

  return (
    <div className="h-full flex flex-col overflow-hidden max-w-full">
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between shrink-0 bg-sidebar">
        <h3 className="text-lg font-semibold tracking-tight text-foreground truncate">
          {displayName}
        </h3>

        <Avatar className="size-8 shadow-lg glow-blue">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initial}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground border-b border-border/50 pb-1 flex items-center">
            <UserIcon className="size-4 mr-2 text-primary" />
            Account Information
          </h4>

          <div className="space-y-2 text-sm">
            <div className="flex">
              <FingerprintIcon className="size-4 mr-3 mt-0.5 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground shrink-0 w-20">ID:</span>
              <span className="ml-2 font-mono text-xs text-foreground truncate break-all opacity-70">
                {user.id}
              </span>
            </div>

            <div className="flex">
              <MailIcon className="size-4 mr-3 mt-0.5 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground w-20 shrink-0">
                Email:
              </span>
              <span className="ml-2 font-medium text-foreground truncate">
                {user.email}
              </span>
            </div>

            <div className="flex">
              <ShieldIcon className="size-4 mr-3 mt-0.5 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground w-20 shrink-0">
                Status:
              </span>
              <span className="ml-2 font-medium flex items-center">
                {user.emailVerified ? (
                  <>
                    <CheckCircleIcon className="size-4 text-green-500 mr-1" />
                    <span className="text-green-500">Verified</span>
                  </>
                ) : (
                  <>
                    <XCircleIcon className="size-4 text-destructive mr-1" />
                    <span className="text-destructive">Unverified</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-border">
          <Button
            onClick={onLogout}
            variant="destructive"
            className={cn("w-full")}
          >
            <LogOutIcon className="mr-2 size-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};
