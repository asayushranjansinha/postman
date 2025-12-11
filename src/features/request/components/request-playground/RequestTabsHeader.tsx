"use client";

import { XIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";
import { cn } from "@/lib/utils";

import { requestColorMap } from "@/features/request/utils";

export const RequestTabsHeader = () => {
  const { openTabIds, tabs, activeRequestId, setActiveTab, closeRequestTab } =
    useRequestEditorStore();

  const handleClose = (e: React.MouseEvent, requestId: string) => {
    e.stopPropagation(); // Prevent the tab switch click event
    closeRequestTab(requestId);
  };

  // If there are no open tabs, don't render this component.
  if (!activeRequestId || openTabIds.length === 0) {
    return null;
  }

  // Style for the Trigger button itself
  const triggerStyles = cn(
    "flex items-center gap-3 p-0 px-4 cursor-pointer text-sm font-medium",
    "border-border h-12", // Height set by h-12 min-h-12 (50px)
    "bg-transparent shadow-none rounded-none", // Remove shadcn default style resets
    "text-muted-foreground hover:bg-secondary/70", // Inactive/Hover style
    "transition-colors shrink-0", // Prevent shrinking

    // Overrides for active state, applied conditionally by TabsTrigger
    "data-[state=active]:shadow-none data-[state=active]:bg-background",
    "data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-foreground"
  );
  // --- End Reusable Class Styles ---

  return (
    // 1. TabsRoot manages the active tab state
    <Tabs
      value={activeRequestId}
      onValueChange={setActiveTab}
      className="flex flex-col w-full"
    >
      {/* 2. ScrollArea enables horizontal scrolling for the tab list */}
      <ScrollArea className="w-full border-b">
        {/* 3. TabsList needs custom classes to enable scrolling */}
        <TabsList className="h-auto p-0 justify-start w-max min-w-full bg-transparent border-none rounded-none divide-x divide-border">
          {openTabIds.map((id) => {
            const tabData = tabs[id];

            return (
              <TabsTrigger
                key={id}
                value={id}
                className={triggerStyles}
                asChild
                // We use React.Children to combine the method tag, name, and button
              >
                <div>
                  {/* Request Method Tag */}
                  <span
                    className={`text-xs font-bold ${
                      requestColorMap[
                        tabData.method as keyof typeof requestColorMap
                      ]
                    }`}
                  >
                    {tabData.method}
                  </span>

                  {/* Request Name (Truncated) */}
                  <span className="max-w-40 truncate">{tabData.name}</span>

                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-80 hover:opacity-100"
                    onClick={(e) => handleClose(e, id)}
                    title={`Close ${tabData.name}`}
                  >
                    <XIcon className="size-3" />
                  </Button>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* 4. ScrollBar for horizontal dragging */}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Tabs>
  );
};
