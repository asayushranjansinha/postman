import { HttpMethod } from "@prisma/client";
import { SendIcon } from "lucide-react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { requestBgMap, requestColorMap } from "@/features/request/utils";
import { cn } from "@/lib/utils";

const methods = Object.keys(HttpMethod);
type Method = (typeof methods)[number];

interface LiveDemoRequestBuilderProps {
  selectedMethod: Method;
  setSelectedMethod: (method: Method) => void;
  fullUrl: string;
  setFullUrl: (url: string) => void;
  runTest: () => void;
  isLimitReached: boolean;
  isRunning: boolean;
}

export const LiveDemoRequestBuilder = ({
  selectedMethod,
  setSelectedMethod,
  fullUrl,
  setFullUrl,
  runTest,
  isLimitReached,
  isRunning,
}: LiveDemoRequestBuilderProps) => {
  return (
    <div className="p-4 sm:p-6 border-b border-border relative">
      <InputGroup className={cn(isLimitReached && "opacity-50", "h-12! p-0")}>
        <InputGroupAddon>
          <Select
            value={selectedMethod}
            onValueChange={(value) => setSelectedMethod(value as Method)}
            disabled={isLimitReached || isRunning}
          >
            <SelectTrigger
              className={cn(
                "h-8! w-24 gap-1 px-2 rounded-r-none border-r-0 border-r-transparent [&>svg:not([class*='size-'])]:size-4.5 has-[>svg]:px-2 border-none",
                requestColorMap[selectedMethod as keyof typeof requestColorMap],
                requestBgMap[selectedMethod as keyof typeof requestBgMap]
              )}
            >
              <SelectValue placeholder="GET" />
            </SelectTrigger>
            <SelectContent className="w-24 min-w-none">
              <SelectGroup>
                {methods.map((method) => (
                  <SelectItem
                    key={method}
                    value={method}
                    className="text-sm font-mono"
                    disabled={method !== "GET"}
                  >
                    <span
                      className={
                        requestColorMap[method as keyof typeof requestColorMap]
                      }
                    >
                      {method}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </InputGroupAddon>

        <InputGroupInput
          type="text"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          className="rounded-none focus-visible:ring-0 text-foreground font-mono text-sm"
          placeholder="Enter your full URL (e.g., https://api.example.com/data)"
          disabled={isLimitReached || isRunning}
        />

        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={runTest}
            disabled={isRunning || isLimitReached}
            variant={"default"}
            className={cn(
              "rounded-l-none h-8!",
              isLimitReached ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Running...
              </>
            ) : (
              <>
                <SendIcon className="w-4 h-4" />
                Send
              </>
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
