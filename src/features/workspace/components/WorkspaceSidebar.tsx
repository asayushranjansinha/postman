// src/components/WorkspaceSidebar.tsx (Revised)
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CollectionTab } from "@/features/collection/components/collection-tab";
import { ProfileTab } from "@/features/collection/components/profile-tab";
import {
  ArchiveIcon,
  ClockIcon,
  Share2Icon,
  UserIcon,
  LucideIcon,
} from "lucide-react";
import { InviteMemberComponent } from "./invites/InviteMemberComponent";

// Define the structure for a sidebar tab item
interface SidebarTabItem {
  icon: LucideIcon;
  label: string;
  badgeContent?: number; // Optional badge content
  component?: React.ReactNode;
}

const sidebarTabItems: SidebarTabItem[] = [
  { icon: ArchiveIcon, label: "Collections", component: <CollectionTab /> },
  { icon: ClockIcon, label: "History", badgeContent: 5 },
  { icon: Share2Icon, label: "Share" },
  { icon: UserIcon, label: "Profile", component: <ProfileTab /> },
];

// Assume this component receives the ID of the currently active workspace
interface WorkspaceSidebarProps {
  workspaceId: string; // Add this prop
}

export function WorkspaceSidebar({ workspaceId }: WorkspaceSidebarProps) {
  const defaultValue =
    sidebarTabItems[0]?.label.toLowerCase().replace(/\s/g, "-") ||
    "collections";
  return (
    <Tabs
      defaultValue={defaultValue}
      orientation="vertical"
      className="flex h-full w-full rounded-none bg-transparent min-w-0 overflow-hidden"
    >
      <TabsList className="flex-col h-full rounded-none justify-start border-r py-4 gap-0.5 shrink-0">
        {sidebarTabItems.map((item) => {
          const tabValue = item.label.toLowerCase().replace(/\s/g, "-");
          const IconComponent = item.icon;

          return (
            <TooltipProvider delayDuration={0} key={tabValue}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger value={tabValue} className="group py-3">
                      <span className="relative">
                        <IconComponent
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {item.badgeContent !== undefined && (
                          <Badge className="absolute -top-2.5 left-full size-4 -translate-x-1.5 border-background px-0.5 text-[10px]/[.875rem] transition-opacity group-data-[state=inactive]:opacity-50 aspect-square!">
                            {item.badgeContent}
                          </Badge>
                        )}
                      </span>
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </TabsList>

      {/* Content Area: Now a flex column */}
      <div className="flex flex-col grow text-start p-0 min-w-0 overflow-hidden h-full">
        {/* INVITE MEMBER COMPONENT (FIXED HEADER) */}
        <InviteMemberComponent workspaceId={workspaceId} />

        {/* Tab Content (SCROLLABLE BODY) */}
        <div className="flex-1 overflow-y-auto">
          {sidebarTabItems.map((item) => {
            const tabValue = item.label.toLowerCase().replace(/\s/g, "-");
            const TabContentComponent = item.component;

            return (
              <TabsContent
                value={tabValue}
                key={tabValue}
                // Removed h-full and overflow-hidden here to allow parent div to control scroll
                className="p-0 min-w-0"
              >
                {TabContentComponent ? (
                  TabContentComponent
                ) : (
                  <p className="px-4 py-1.5 text-xs text-muted-foreground">
                    Content for **{item.label}** Coming Soon
                  </p>
                )}
              </TabsContent>
            );
          })}
        </div>
      </div>
    </Tabs>
  );
}
