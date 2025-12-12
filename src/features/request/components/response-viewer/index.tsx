"use client";

import React, { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrismaRequestRun } from "../../types";
// Assuming getStatusColor and getStatusText are imported and available
import { getStatusColor, getStatusText } from "../../utils";
import { cn } from "@/lib/utils";

interface RequestRunResponseViewerProps {
  runData: PrismaRequestRun | null;
  isLoading: boolean;
}

const BodyViewer: React.FC<{ body: string | null }> = ({ body }) => {
  const formattedBody =
    (body && body.trim().startsWith("{")) || body?.trim().startsWith("[")
      ? JSON.stringify(JSON.parse(body), null, 2)
      : body;

  return (
    // STYLED: Used theme-aware bg-muted/50 for the code block background
    <ScrollArea className="flex-1 h-full bg-muted/50">
      <div className="p-4">
        {body === null ? (
          <p className="text-muted-foreground text-sm">
            No response body received.
          </p>
        ) : (
          // Fixed text color for better readability against dark backgrounds
          <pre className="text-xs font-mono whitespace-pre-wrap text-foreground">
            {formattedBody}
          </pre>
        )}
      </div>
    </ScrollArea>
  );
};

const HeadersViewer: React.FC<{ headers: PrismaRequestRun["headers"] }> = ({
  headers,
}) => (
  <ScrollArea className="h-full">
    <div className="p-4 overflow-x-auto">
      {headers.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No response headers received.
        </p>
      ) : (
        // STYLED: Use border-border and bg-card for header table styling
        <table className="w-full text-left text-xs table-auto border-collapse">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="py-2 w-1/4 min-w-[120px]">Key</th>
              <th className="py-2 w-3/4 min-w-[200px]">Value</th>
            </tr>
          </thead>
          <tbody>
            {headers.map((h, index) => (
              <tr
                key={index}
                className="border-b border-border/50 hover:bg-muted/50 transition-colors"
              >
                <td className="py-2 font-mono text-foreground break-all">
                  {h.key}
                </td>
                <td className="py-2 font-mono text-muted-foreground break-all">
                  {h.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </ScrollArea>
);

const ErrorViewer: React.FC<{ error: string }> = ({ error }) => (
  <ScrollArea className="h-full">
    <div className="p-4">
      <div className="border border-destructive/50 bg-destructive/10 text-destructive-foreground rounded-md p-4">
        <h3 className="font-bold mb-2">System/Network Error</h3>
        <pre className="text-xs whitespace-pre-wrap">{error}</pre>
      </div>
    </div>
  </ScrollArea>
);

export const RequestRunResponseViewer: React.FC<
  RequestRunResponseViewerProps
> = ({ runData, isLoading }) => {
  const tabKeys = {
    body: "Body",
    headers: "Headers",
    error: "Error Log",
  };

  const initialTabKey = runData?.error ? "error" : "body";
  const [activeTabKey, setActiveTabKey] =
    useState<keyof typeof tabKeys>(initialTabKey);

  useEffect(() => {
    setActiveTabKey(runData?.error ? "error" : "body");
  }, [runData]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <div className="text-center space-y-2 text-primary">
          {/* STYLED: Standard shadcn/ui spinner style */}
          <div className="animate-spin h-6 w-6 mx-auto border-4 border-primary/30 border-t-primary rounded-full" />
          <p>Sending request...</p>
        </div>
      </div>
    );
  }

  if (!runData) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <p>Click "Send" to execute the request and view the response here.</p>
      </div>
    );
  }

  // Use utils to determine styling for status bar
  const statusClass = getStatusColor(runData.status, runData.error);
  const statusText = getStatusText(runData.status, runData.error);

  // Custom styling for the status bar container
  const statusHeaderClass = runData.error
    ? "bg-destructive/20 border-destructive"
    : cn("border-l-4", statusClass, "bg-background/80");

  return (
    // STYLED: Use bg-card for the main container
    <div className="flex flex-col flex-1 h-full bg-card">
      <div
        // STYLED: Simplified and centralized status bar styling
        className={cn(
          "p-4 flex justify-between items-center border-b border-border font-mono",
          statusHeaderClass
        )}
      >
        <div className="flex items-center space-x-4">
          <span className="text-xl font-extrabold text-foreground">
            {statusText}
          </span>
          {/* Status badge is omitted for network errors as they don't have an HTTP status code */}
          {runData.status && (
            <span
              className={cn(
                "text-sm rounded-full px-2 py-0.5 border text-foreground",
                statusClass
              )}
            >
              HTTP {runData.status}
            </span>
          )}
        </div>
        <div className="text-sm font-semibold text-muted-foreground">
          {runData.durationMs ? `${runData.durationMs} ms` : "N/A"}
        </div>
      </div>

      <Tabs
        value={activeTabKey}
        onValueChange={(value) =>
          setActiveTabKey(value as keyof typeof tabKeys)
        }
        className="flex-1 flex flex-col h-full overflow-hidden" // ADDED: overflow-hidden to fix clipping
      >
        <TabsList className="flex border-b border-border h-auto p-0 bg-transparent rounded-none justify-start">
          {Object.entries(tabKeys)
            .filter(([key]) => key !== "error" || runData.error)
            .map(([key, name]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="
                  text-sm font-medium transition-colors 
                  text-muted-foreground px-3 py-2 -mb-px
                  data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none
                  data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary
                "
              >
                {name}
              </TabsTrigger>
            ))}
        </TabsList>

        {/* This div must have overflow-hidden to prevent the scroll area from causing a double scrollbar */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="body" className="h-full mt-0">
            <BodyViewer body={runData.body} />
          </TabsContent>
          <TabsContent value="headers" className="h-full mt-0">
            <HeadersViewer headers={runData.headers} />
          </TabsContent>
          {runData.error && (
            <TabsContent value="error" className="h-full mt-0">
              <ErrorViewer error={runData.error} />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};
