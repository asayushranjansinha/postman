"use client";

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { UserProps } from "../types";

interface UserButtonProps {
  user: UserProps | null;
  onLogout?: () => void | Promise<void>;
  onSettings?: () => void;
  onProfile?: () => void;
  onBilling?: () => void;
  showBadge?: boolean;
  badgeText?: string;
  badgeVariant?: ComponentPropsWithoutRef<typeof Badge>["variant"];
  size?: ComponentPropsWithoutRef<typeof Button>["size"];
  showEmail?: boolean;
  showMemberSince?: boolean;
}

export const UserButton = ({
  user,
  onLogout,
  onSettings,
  onProfile,
  onBilling,
  showBadge = false,
  badgeText = "Pro",
  badgeVariant = "default",
  size = "default",
  showEmail = true,
  showMemberSince = false,
}: UserButtonProps) => {
  const router = useRouter();

  const getInitials = (name: string | null, email: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const formatMemberSince = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          onLogout?.();
        },
      },
    });
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Avatar
          aria-label="User Menu"
          className={cn(
            size === "sm"
              ? "h-8 w-8"
              : size === "lg"
              ? "h-12 w-12"
              : "h-10 w-10",
            "rounded-sm border-2"
          )}
        >
          <AvatarImage
            className="rounded-sm"
            src={user?.image || undefined}
            alt={user?.name || `${user.email} - "Profile"`}
          />
          <AvatarFallback className="rounded-sm">
            {getInitials(user?.name, user?.email)}
          </AvatarFallback>
        </Avatar>
        {showBadge && (
          <Badge
            variant={badgeVariant}
            className="absolute bottom-0 -right-1.5 px-1.5 py-0 text-xs pointer-events-none"
          >
            {badgeText}
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || "User"}
            </p>
            {showEmail && user?.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            )}
            {showMemberSince && user?.createdAt && (
              <p className="text-xs leading-none text-muted-foreground">
                Member since {formatMemberSince(user.createdAt)}
              </p>
            )}
          </div>
        </DropdownMenuLabel>

        {(onProfile || onSettings || onBilling) && <DropdownMenuSeparator />}

        {onProfile && (
          <DropdownMenuItem onClick={onProfile}>
            <UserIcon className="size-4 mr-1" />
            Your Profile
          </DropdownMenuItem>
        )}

        {onSettings && (
          <DropdownMenuItem onClick={onSettings}>
            <SettingsIcon className="size-4 mr-1" />
            Account Settings
          </DropdownMenuItem>
        )}

        {onBilling && (
          <DropdownMenuItem onClick={onBilling}>
            <CreditCardIcon className="size-4 mr-1" />
            Billing & Plans
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>
          <LogOutIcon className="size-4 mr-1" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
