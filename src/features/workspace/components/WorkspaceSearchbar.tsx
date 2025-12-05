"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { useCommandShortcut } from "../hooks/use-command-shortcut";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WorkspaceSearchbarProps {
  className?: string;
}

export const WorkspaceSearchbar = ({ className }: WorkspaceSearchbarProps) => {
  const [open, setOpen] = useState(false);

  useCommandShortcut(() => setOpen((prev) => !prev));

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className={cn(
          "relative flex w-full max-w-full gap-3 h-9 cursor-text items-center justify-between",
          className
        )}
      >
        <span className="inline-flex flex-1 items-center overflow-hidden">
          <Search size={16} className="mr-2 shrink-0" />
          <span className="text-xs truncate">Search</span>
        </span>

        <span className="flex space-x-1 shrink-0">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} className="p-2">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Suggestions" style={{ paddingBottom: "12px" }}>
            <CommandItem className="h-10">Pre-request Script</CommandItem>
            <CommandItem className="h-10">Tests</CommandItem>
            <CommandItem className="h-10">Variables</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Other">
            <CommandItem className="h-10">Documentation</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
