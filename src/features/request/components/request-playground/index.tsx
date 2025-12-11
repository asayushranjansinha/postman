"use client";

import { RequestRunResponseViewer } from "@/features/request/components/response-viewer";
import { useActiveRequestSync } from "@/features/request/hooks/useActiveRequestSync";
import { useRunRequestMutation } from "@/features/request/mutations"; 

import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";
import { RequestEditorContent } from "./RequestEditorContent";
import { RequestTabsHeader } from "./RequestTabsHeader";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PrismaRequestRun } from "../../types";


export const RequestPlayground = () => {
  useActiveRequestSync();

  const { openTabIds, activeRequestId } = useRequestEditorStore();
  const hasOpenTabs = openTabIds.length > 0;

  const executeMutation = useRunRequestMutation();
  
  const isLoading = executeMutation.isPending;

  const { setTabData: updateStoreTabData } = useRequestEditorStore();

  const activeRequest = activeRequestId
    ? useRequestEditorStore.getState().tabs[activeRequestId]
    : null;
  const lastRun = activeRequest?.lastRun || null;

  const handleSend = () => {
    if (!activeRequestId) return;

    executeMutation.mutate(activeRequestId, {
      onSuccess: (response) => {
        if (response.success && response.data) {
          // The response.data is the real PrismaRequestRun, update the store.
          // This path handles successful server action AND successful/failed external HTTP calls (2xx, 4xx, 5xx).
          updateStoreTabData(activeRequestId, {
            lastRun: response.data,
          });
        } else {
          // This path handles failed server actions (e.g., Auth error, Network error that was thrown)
          updateStoreTabData(activeRequestId, {
            // Cast the error object to the expected run structure for display
            lastRun: {
              id: `error_run_${Date.now()}`,
              requestId: activeRequestId,
              executedAt: new Date(),
              status: 0, 
              body: null,
              durationMs: 0,
              // The message contains the error reason (e.g., "External Request Failed: ECONNREFUSED...")
              error: `Server Action Error: ${response.message}`,
              headers: [],
            } as PrismaRequestRun,
          });
        }
      },
      onError: (error) => {
        // Handle client mutation error (e.g., network error before hitting the server action)
        console.error("[UI - Playground] Client mutation error:", error);
        updateStoreTabData(activeRequestId, {
          lastRun: {
            id: `client_error_${Date.now()}`,
            requestId: activeRequestId,
            executedAt: new Date(),
            status: 0,
            body: null,
            durationMs: 0,
            error: `Client/Network Error: ${error.message}`,
            headers: [],
          } as PrismaRequestRun,
        });
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <RequestTabsHeader />

      {hasOpenTabs && activeRequestId ? (
        <ResizablePanelGroup direction="vertical" className="flex-1">
          <ResizablePanel defaultSize={65} minSize={20}>
            <div className="flex flex-col h-full overflow-y-auto border-b">
              <RequestEditorContent onSend={handleSend} isSending={isLoading} />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle={true} />

          <ResizablePanel defaultSize={35} minSize={20}>
            <div className="flex flex-col h-full overflow-y-auto">
              <RequestRunResponseViewer
                runData={lastRun}
                isLoading={isLoading}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center p-4">
            <p className="text-lg mb-2">No requests open</p>
            <p className="text-sm">
              Select a request from the sidebar or click "Add Request" to begin.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};