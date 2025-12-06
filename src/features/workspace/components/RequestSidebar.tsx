"use client";
import { ArchiveIcon, ClockIcon, CodeIcon, Share2Icon } from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/shared/Hint";
import { Button } from "@/components/ui/button";
import { useWorkspaceById } from "../hooks/workspace";
import { CollectionTabs } from "./(tabs)/CollectionTabs";

import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/store";

const sidebarItems = [
  { icon: ArchiveIcon, label: "Collections" },
  { icon: ClockIcon, label: "History" },
  { icon: Share2Icon, label: "Share" },
  { icon: CodeIcon, label: "Code" },
];

export function RequestSidebar() {
  const [activeTab, setActiveTab] = useState("Collections");
  const { selectedWorkspace } = useWorkspaceStore();
  useWorkspaceById(selectedWorkspace?.id!);

  const renderTabContent = () => {
    // TODO: Implement other tabs logic
    switch (activeTab) {
      case "Collections":
        return <CollectionTabs currentWorkspace={selectedWorkspace} />;
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
