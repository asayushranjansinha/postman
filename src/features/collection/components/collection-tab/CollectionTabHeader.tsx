import { HelpCircleIcon } from "lucide-react";

import { ToolTipHint } from "@/components/shared/ToolTipHint";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CollectionTabHeaderProps {
  workspaceName?: string;
}

export const CollectionTabHeader = ({
  workspaceName,
}: CollectionTabHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-2 border-b shrink-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="text-muted-foreground hover:text-foreground">
            {workspaceName || "Workspace"}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium">Collections</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center space-x-2">
        <ToolTipHint label="Help">
          <HelpCircleIcon className="size-4 text-muted-foreground hover:text-foreground cursor-pointer" />
        </ToolTipHint>
      </div>
    </div>
  );
};