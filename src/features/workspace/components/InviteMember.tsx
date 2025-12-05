"use client";

import { CheckIcon, CopyIcon, Link as LinkIcon, UserPlus } from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/shared/Hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export const InviteMember = () => {
  const [copied, setIsCopied] = useState(false);
  const generateInviteLink = async () => {};
  const copyToClipboard = async () => {};

  return (
    <DropdownMenu>
      <Hint label="Invite Member">
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <UserPlus className="size-4 text-primary" />
          </Button>
        </DropdownMenuTrigger>
      </Hint>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="text-muted-foreground text-sm">
          Invite to WORKSPACE NAME
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-1.5 mt-1.5">
          {/* Invite Link Input */}
          <InputGroup>
            <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Copy"
                title="Copy"
                size="icon-xs"
                onClick={() => {
                  copyToClipboard();
                }}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          {/* Generate Button */}
          <Button className="w-full" onClick={generateInviteLink}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Generate Link
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
