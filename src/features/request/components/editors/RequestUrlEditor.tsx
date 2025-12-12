"use client";
import { SendIcon } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { HttpMethod } from "@prisma/client";
import { requestBgMap, requestColorMap } from "../../utils";
import { PrismaRequestDetails } from "@/features/request/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RequestUrlInputProps {
  tab: PrismaRequestDetails;
  updateTab: (id: string, data: Partial<PrismaRequestDetails>) => void;
  onSend: () => void;
}

/**
 * Editor for constructing API request URLs and methods.
 * Features an HTTP method selector, URL input, and a "Send" button.
 * Props: `tab` (details), `updateTab` (state sync), `onSend` (execute request).
 */
export const RequestUrlEditor = ({
  tab,
  updateTab,
  onSend,
}: RequestUrlInputProps) => {
  const currentMethod = tab.method;
  const methods = Object.keys(HttpMethod);

  return (
    <div className="flex flex-col w-full">
      {/* Desktop Layout - Original InputGroup */}
      <div className="hidden md:flex flex-row items-center justify-between w-full">
        <InputGroup>
          <InputGroupAddon>
            <Select
              value={currentMethod}
              onValueChange={(value) =>
                updateTab(tab.id, { method: value as HttpMethod })
              }
            >
              <SelectTrigger
                className={cn(
                  "h-6! w-24 gap-1 px-2 rounded-r-none border-r-0 border-r-transparent [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2 border-none",
                  requestColorMap[currentMethod],
                  requestBgMap[currentMethod]
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
          <InputGroupInput
            placeholder="Enter request URL"
            value={tab.url}
            onChange={(e) => updateTab(tab.id, { url: e.target.value })}
            className="h-10 rounded-none focus-visible:ring-0"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="default"
              onClick={onSend}
              className="rounded-l-none"
            >
              <SendIcon className="size-3.5 mr-1" />
              Send
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="md:hidden flex flex-col gap-2 w-full p-2">
        {/* Method Selector and URL Input Row */}
        <div className="flex gap-2 w-full">
          <Select
            value={currentMethod}
            onValueChange={(value) =>
              updateTab(tab.id, { method: value as HttpMethod })
            }
          >
            <SelectTrigger
              className={cn(
                "h-10 w-20 gap-1 px-2 text-xs font-medium",
                requestColorMap[currentMethod],
                requestBgMap[currentMethod]
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

          <Input
            placeholder="Enter request URL"
            value={tab.url}
            onChange={(e) => updateTab(tab.id, { url: e.target.value })}
            className="h-10 flex-1"
          />
        </div>

        {/* Send Button - Full Width */}
        <Button onClick={onSend} className="w-full h-10">
          <SendIcon className="size-4 mr-2" />
          Send Request
        </Button>
      </div>
    </div>
  );
};