"use client";

import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestBodyEditor } from "../editors/RequestBodyEditor";
import { RequestHeadersEditor } from "../editors/RequestHeadersEditor";
import { RequestQueryParamsEditor } from "../editors/RequestQueryParamsEditor";
import { RequestUrlEditor } from "../editors/RequestUrlEditor";

import { cn } from "@/lib/utils";

interface RequestEditorContentProps {
  onSend: () => void;
  isSending: boolean;
}

const EDITOR_TABS = {
  PARAMS: "params",
  HEADERS: "headers",
  BODY: "body",
} as const;

type EditorTabKey = (typeof EDITOR_TABS)[keyof typeof EDITOR_TABS];

export const RequestEditorContent = ({
  onSend,
  isSending,
}: RequestEditorContentProps) => {
  const { activeRequestId, tabs, setTabData } = useRequestEditorStore();

  if (!activeRequestId) return null;

  const activeRequest = tabs[activeRequestId];
  if (!activeRequest) {
    return (
      <div className="p-4 text-red-500">
        Error: Could not load data for active tab.
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <header className="flex items-center justify-between p-3 border-b bg-muted/30">
        <h2 className="text-lg font-semibold truncate text-muted-foreground">
          Editing: {activeRequest.name}
        </h2>
      </header>

      <div className="p-4 border-b">
        <RequestUrlEditor
          tab={activeRequest}
          updateTab={setTabData}
          onSend={onSend}
        />
      </div>

      <Tabs
        defaultValue={EDITOR_TABS.PARAMS}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <TabsList
          className={cn(
            "h-auto justify-start border-b rounded-none bg-transparent p-0"
          )}
        >
          <TabsTrigger
            value={EDITOR_TABS.PARAMS}
            className={cn(
              "data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none",
              "data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary",
              "text-muted-foreground px-3 py-2 -mb-px"
            )}
          >
            Query Params
          </TabsTrigger>

          <TabsTrigger
            value={EDITOR_TABS.HEADERS}
            className={cn(
              "data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none",
              "data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary",
              "text-muted-foreground px-3 py-2 -mb-px"
            )}
          >
            Headers
          </TabsTrigger>

          <TabsTrigger
            value={EDITOR_TABS.BODY}
            className={cn(
              "data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none",
              "data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary",
              "text-muted-foreground px-3 py-2 -mb-px"
            )}
          >
            Body
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value={EDITOR_TABS.PARAMS} className="p-4 mt-0">
            <RequestQueryParamsEditor
              key={activeRequestId + "-query"}
              requestId={activeRequestId}
              initialQueryParams={activeRequest.queryParams}
            />
          </TabsContent>

          <TabsContent value={EDITOR_TABS.HEADERS} className="p-4 mt-0">
            <RequestHeadersEditor
              key={activeRequestId + "-headers"}
              requestId={activeRequestId}
              initialHeaders={activeRequest.headers}
            />
          </TabsContent>

          <TabsContent value={EDITOR_TABS.BODY} className="p-4 mt-0">
            <RequestBodyEditor
              key={activeRequestId + "-body"}
              requestId={activeRequestId}
              initialBody={activeRequest.body ?? ""}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};