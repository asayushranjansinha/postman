"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WorkspaceSidebar } from "@/features/workspace/components/WorkspaceSidebar";

export function MobileWorkspaceSheet({ workspaceId }: { workspaceId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg md:hidden z-50"
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Open workspace menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] p-0">
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle>Workspace</SheetTitle>
        </SheetHeader>
        <div className="h-[calc(100%-4rem)] overflow-hidden">
          <WorkspaceSidebar workspaceId={workspaceId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
