"use client";

import { Plus, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";


export const WorkspaceSelector = () => {
  return (
    <Select>
      <SelectTrigger className="select-none w-60">
        <div className="flex justify-start items-center gap-1">
          <User className="size-4" />
          <SelectValue placeholder="Select workspace" />
        </div>
      </SelectTrigger>

      <SelectContent className="w-60">
        <SelectItem value="ws-1">Workspace One</SelectItem>
        <SelectItem value="ws-2">Workspace Two</SelectItem>
        <SelectItem value="ws-3">Workspace Three</SelectItem>

        <Separator className="my-1" />

        <div className="flex justify-between items-center select-none">
          <span className="text-sm pl-2 font-medium text-muted-foreground">
            My Workspaces
          </span>
          <Button size="icon-sm" variant="outline" aria-label="Add workspace">
            <Plus className="size-4" />
          </Button>
        </div>
      </SelectContent>
    </Select>
  );
};
