"use client";

import { RequestRunResponseViewer } from "@/features/request/components/response-viewer";
import { useActiveRequestSync } from "@/features/request/hooks/useActiveRequestSync";
import { useExecuteFakeRequestMutation } from "@/features/request/mutations";
import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";
import { RequestEditorContent } from "./RequestEditorContent";
import { RequestTabsHeader } from "./RequestTabsHeader";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface FakeRequestRun {
  id: string;
  requestId: string;
  executedAt: Date;
  status: number | null;
  body: string | null;
  durationMs: number | null;
  error: string | null;
  headers: { key: string; value: string }[];
}

export const RequestPlayground = () => {
  useActiveRequestSync();

  const { openTabIds, activeRequestId } = useRequestEditorStore();
  const hasOpenTabs = openTabIds.length > 0;

  const executeMutation = useExecuteFakeRequestMutation();
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
          updateStoreTabData(activeRequestId, {
            lastRun: response.data,
          });
        } else {
          updateStoreTabData(activeRequestId, {
            lastRun: {
              id: `error_run_${Date.now()}`,
              requestId: activeRequestId,
              executedAt: new Date(),
              status: 0,
              body: null,
              durationMs: 0,
              error: `Server Action Error: ${response.message}`,
              headers: [],
            } as FakeRequestRun,
          });
        }
      },
      onError: (error) => {
        console.error("[UI - Playground] Client mutation error:", error);
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