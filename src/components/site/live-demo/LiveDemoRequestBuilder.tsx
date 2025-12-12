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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="w-full p-4 border-b border-border bg-card">
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full">
        <InputGroup>
          {/* Method */}
          <InputGroupAddon>
            <Select
              value={selectedMethod}
              onValueChange={(v) => setSelectedMethod(v as HttpMethod)}
            >
              <SelectTrigger
                className={cn(
                  "h-6! w-24 gap-1 px-2 rounded-r-none border-r-0 border-r-transparent [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2 border-none",
                  requestColorMap[
                    selectedMethod as keyof typeof requestColorMap
                  ],
                  requestBgMap[selectedMethod as keyof typeof requestBgMap]
                )}
              >
                <SelectValue placeholder="GET" />
              </SelectTrigger>
              <SelectContent className="w-24 min-w-none">
                <SelectGroup>
                  {methods.map((method) => (
                    <SelectItem key={method} value={method} className="text-xs">
                      <span>{method}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </InputGroupAddon>

          {/* URL */}
          <InputGroupInput
            placeholder="Enter request URL"
            value={fullUrl}
            onChange={(e) => setFullUrl(e.target.value)}
            className="h-10 rounded-none focus-visible:ring-0"
          />

          {/* Send */}
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="default"
              onClick={runTest}
              disabled={isRunning || isLimitReached}
              className="rounded-l-none"
            >
              <SendIcon className="size-3.5 mr-1" />
              Send
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-2 w-full">
        <div className="flex gap-2 w-full">
          {/* Method */}
          <Select
            value={selectedMethod}
            onValueChange={(v) => setSelectedMethod(v as HttpMethod)}
          >
            <SelectTrigger
              className={cn(
                "h-10 w-20 gap-1 px-2 text-xs font-medium",
                requestColorMap[selectedMethod as keyof typeof requestColorMap],
                requestBgMap[selectedMethod as keyof typeof requestBgMap]
              )}
            >
              <SelectValue placeholder="GET" />
            </SelectTrigger>
            <SelectContent className="w-24">
              <SelectGroup>
                {methods.map((method) => (
                  <SelectItem key={method} value={method} className="text-xs">
                    <span>{method}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* URL */}
          <Input
            placeholder="Enter request URL"
            value={fullUrl}
            onChange={(e) => setFullUrl(e.target.value)}
            className="h-10 flex-1"
          />
        </div>

        {/* Send Button */}
        <Button
          onClick={runTest}
          disabled={isRunning || isLimitReached}
          className="w-full h-10"
        >
          <SendIcon className="size-4 mr-2" />
          Send Request
        </Button>
      </div>
    </div>
  );
};
