"use client";

import {
  ClockIcon,
  CopyIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  EyeIcon,
  FolderIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DATETIME_FORMAT, TIMESTAMP_FORMAT } from "@/constants/time";
import { PrismaWorkspace } from "@/features/workspace/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

export function WorkspaceCard({
  workspace,
  onDelete,
  onRename,
}: {
  workspace: PrismaWorkspace;
  onDelete?: (workspace: PrismaWorkspace) => void;
  onRename?: (workspace: PrismaWorkspace) => void;
}) {
  const { copiedText, copyFn, copied } = useCopyToClipboard();
  return (
    <Card className="group relative overflow-hidden bg-card hover:bg-card/80 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 p-0">
      {/* Background Gradient Effect - Refined opacity for subtle glow */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-75 transition-opacity duration-300" />

      <CardHeader className="relative p-4">
        <div className="flex items-start justify-between">
          {/* Icon Container */}
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
            <FolderIcon className="w-5 h-5 text-primary" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVerticalIcon
                className="size-3.5"
                aria-label="open workspace menu"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 text-sm">
              <DropdownMenuLabel className="truncate text-xs font-mono py-1 px-2">
                {workspace.id}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(workspace)}
                className="text-sm"
              >
                <Trash2Icon className="size-3.5 mr-2" /> Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onRename?.(workspace)}
                className="text-sm"
              >
                <PencilIcon className="size-3.5 mr-2" /> Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-sm">
                <Link href={`/workspace/${workspace.id}`}>
                  <EyeIcon className="size-3.5 mr-2" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => copyFn(workspace.id)}
                className="text-sm"
              >
                <CopyIcon className="size-3.5 mr-2" />
                Copy ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-lg font-semibold">
          {workspace.name}
        </CardTitle>
        <CardDescription
          aria-label="workspace id"
          onDoubleClick={() => copyFn(workspace.id)}
          className="font-mono text-xs text-muted-foreground/70"
        >
          {workspace.id}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative p-4 pt-0">
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1.5 text-muted-foreground/80">
            <ClockIcon className="w-3 h-3" />
            <span>{format(workspace.updatedAt, DATETIME_FORMAT)}</span>
          </div>
          <span className="text-xs text-muted-foreground/60">
            Updated {format(workspace.createdAt, TIMESTAMP_FORMAT)}
          </span>
        </div>
        {/* Action Button */}
        <Button asChild className="w-full h-9 text-sm text-primary-foreground">
          <Link href={`/workspace/${workspace.id}`}>
            Open Workspace
            <ExternalLinkIcon className="w-3.5 h-3.5 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
