import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ComponentProps } from "react";

type TooltipContentProps = ComponentProps<typeof TooltipContent>;

export interface ToolTipHintProps extends TooltipContentProps {
  label: string;
  children: React.ReactNode;
}

export const ToolTipHint = ({
  label,
  children,
  ...contentProps
}: ToolTipHintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent {...contentProps}>
          <p className="capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
