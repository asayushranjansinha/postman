"use client";
import { ArchiveIcon, ClockIcon, CodeIcon, Share2Icon } from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/shared/Hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CollectionTabs } from "./(tabs)/CollectionTabs";

const sidebarItems = [
  { icon: ArchiveIcon, label: "Collections" },
  { icon: ClockIcon, label: "History" },
  { icon: Share2Icon, label: "Share" },
  { icon: CodeIcon, label: "Code" },
];

interface RequestSidebarProps {
  workspaceId: string;
}

export function RequestSidebar({ workspaceId }: RequestSidebarProps) {
  const [activeTab, setActiveTab] = useState("Collections");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Collections":
        return <CollectionTabs workspaceId={workspaceId} />;
      case "History":
        return (
          <div className="p-4 text-muted-foreground">
            History coming soon...
          </div>
        );
      case "Share":
        return (
          <div className="p-4 text-muted-foreground">Share coming soon...</div>
        );
      case "Code":
        return (
          <div className="p-4 text-muted-foreground">
            Code generation coming soon...
          </div>
        );
      default:
        return (
          <div className="p-4 text-muted-foreground">
            Select a tab to view content
          </div>
        );
    }
  };

  return (
    <div className="h-full flex overflow-hidden">
      <aside className="w-12 border-r bg-sidebar flex flex-col items-center py-4 gap-3 shadow-sm shrink-0">
        {sidebarItems.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <Hint label={item.label} key={item.label} side="left">
              <Button
                variant={isActive ? "default" : "outline"}
                onClick={() => setActiveTab(item.label)}
                className={cn("p-1.5 border size-8 cursor-pointer")}
              >
                <item.icon className="size-4" />
              </Button>
            </Hint>
          );
        })}
      </aside>
      <main className="flex-1 overflow-hidden">{renderTabContent()}</main>
    </div>
  );
}
