import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CollectionTab } from "@/features/collection/components/collection-tab";
import {
  ArchiveIcon,
  ClockIcon,
  Share2Icon,
  CodeIcon,
  LucideIcon,
} from "lucide-react";

// Define the structure for a sidebar tab item
interface SidebarTabItem {
  icon: LucideIcon;
  label: string;
  badgeContent?: number; // Optional badge content
  component?: React.ReactNode;
}

const sidebarTabItems: SidebarTabItem[] = [
  { icon: ArchiveIcon, label: "Collections", component: <CollectionTab /> },
  { icon: ClockIcon, label: "History", badgeContent: 5 }, // Placeholder value
  { icon: Share2Icon, label: "Share" },
  { icon: CodeIcon, label: "CodeIcon" },
];

export function WorkspaceSidebar() {
  // Set the default value to the first item's label, formatted as an ID
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
          const IconComponent = item.icon; // The icon component

          return (
            <TooltipProvider delayDuration={0} key={tabValue}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* The span wrapper is necessary because TooltipTrigger with asChild cannot directly wrap a disabled element (if TabsTrigger were disabled) */}
                  <span>
                    <TabsTrigger value={tabValue} className="group py-3">
                      <span className="relative">
                        <IconComponent
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {/* Conditionally render the Badge if badgeContent is provided */}
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

      {/* Content Area */}
      <div className="grow text-start p-0 min-w-0 overflow-hidden">
        {sidebarTabItems.map((item) => {
          const tabValue = item.label.toLowerCase().replace(/\s/g, "-");
          const TabContentComponent = item.component; // Renamed variable to avoid confusion

          return (
            <TabsContent
              value={tabValue}
              key={tabValue}
              className="p-0 h-full min-w-0 overflow-hidden"
            >
              {TabContentComponent ? (
                // Directly render the JSX element stored in item.component
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
    </Tabs>
  );
}