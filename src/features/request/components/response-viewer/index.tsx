import React, { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FakeRequestRun } from "../../types";
import { getStatusColor, getStatusText } from "../../utils";

interface RequestRunResponseViewerProps {
  runData: FakeRequestRun | null;
  isLoading: boolean;
}

const BodyViewer: React.FC<{ body: string | null }> = ({ body }) => {
  const formattedBody =
    (body && body.trim().startsWith("{")) || body?.trim().startsWith("[")
      ? JSON.stringify(JSON.parse(body), null, 2)
      : body;

  return (
    <ScrollArea className="flex-1 h-full p-4 bg-gray-50 dark:bg-gray-800">
      {body === null ? (
        <p className="text-muted-foreground text-sm">
          No response body received.
        </p>
      ) : (
        <pre className="text-xs font-mono whitespace-pre-wrap">
          {formattedBody}
        </pre>
      )}
    </ScrollArea>
  );
};

const HeadersViewer: React.FC<{ headers: FakeRequestRun["headers"] }> = ({
  headers,
}) => (
  <ScrollArea className="h-full">
    <div className="p-4">
      {headers.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No response headers received.
        </p>
      ) : (
        <table className="w-full text-left text-xs table-auto border-collapse">
          <thead>
            <tr className="text-muted-foreground border-b">
              <th className="py-2 w-1/4">Key</th>
              <th className="py-2 w-3/4">Value</th>
            </tr>
          </thead>
          <tbody>
            {headers.map((h, index) => (
              <tr
                key={index}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-2 font-mono truncate">{h.key}</td>
                <td className="py-2 font-mono text-muted-foreground truncate">
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

// MODIFICATION: Removed red background/text styling from the wrapper div
const ErrorViewer: React.FC<{ error: string }> = ({ error }) => (
  <ScrollArea className="h-full">
    <div className="p-4">
      {/* Removed bg-red-500/10 text-red-600 rounded-lg */}
      <div className="overflow-auto border dark:border-gray-700 rounded-md">
        <h3 className="font-bold mb-2 p-4 border-b dark:border-gray-700">
          System/Network Error
        </h3>
        <pre className="text-xs whitespace-pre-wrap p-4 text-muted-foreground">
          {error}
        </pre>
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

  React.useEffect(() => {
    setActiveTabKey(runData?.error ? "error" : "body");
  }, [runData]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <div className="text-center space-y-2">
          <svg
            className="animate-spin h-6 w-6 mx-auto text-blue-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
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

  const successColorClass =
    "text-green-500 bg-green-500/10 border-green-500/30";
  const statusClass = runData.error
    ? successColorClass
    : getStatusColor(runData.status, runData.error);

  const statusText = getStatusText(runData.status, runData.error);

  return (
    <div className="flex flex-col flex-1 h-full bg-white dark:bg-gray-900">
      <div
        className={`p-4 flex justify-between items-center border-b border-l-4 ${statusClass} border-opacity-70 font-mono`}
      >
        <div className="flex items-center space-x-4">
          <span className="text-xl font-extrabold">{statusText}</span>
          {/* Status badge is omitted for errors as they don't have an HTTP status code */}
          {runData.status && (
            <span
              className={`text-sm rounded-full px-2 py-0.5 border ${statusClass} border-opacity-30`}
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
        className="flex-1 flex flex-col h-full"
      >
        <TabsList className="flex border-b h-auto p-0 bg-transparent dark:bg-transparent rounded-none justify-start">
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
