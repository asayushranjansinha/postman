"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RequestRunResponseViewer } from "@/features/request/components/response-viewer";
import { useActiveRequestSync } from "@/features/request/hooks/useActiveRequestSync";
import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";
import { RequestEditorContent } from "./RequestEditorContent";
import { RequestTabsHeader } from "./RequestTabsHeader";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useRequestSaveHotkey } from "@/features/request/hooks/hotkeys/useRequestSaveHotkey";
import { useRequestExecution } from "@/features/request/hooks/useRequestExecution";
import { useNewRequestHotkey } from "@/features/request/hooks/hotkeys/useNewRequestHotkey";

import { SaveRequestModal } from "@/features/request/components/modals/SaveRequestModal"; 
import { SaveIcon } from "lucide-react"; 

export const RequestPlayground = () => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); 

  useActiveRequestSync();
  useRequestSaveHotkey();
  useNewRequestHotkey();

  const { openTabIds, activeRequestId, tabs } = useRequestEditorStore();
  
  // Safely access the active request
  const activeRequest = tabs[activeRequestId!] || {}; 
  const hasOpenTabs = openTabIds.length > 0;

  const { isLoading, lastRun, handleSend } = useRequestExecution();

  // Determine if the request is unsaved
  const isUnsaved = !activeRequest.isSaved;
  
  const openSaveModal = () => setIsSaveModalOpen(true);
  const handleCloseSaveModal = () => setIsSaveModalOpen(false);

  return (
    <div className="flex flex-col w-full h-full">
      <RequestTabsHeader />

      {hasOpenTabs && activeRequestId ? (
        <>
          <ResizablePanelGroup direction="vertical" className="flex-1">
            <ResizablePanel defaultSize={65} minSize={20}>
              <div className="flex flex-col h-full overflow-y-auto border-b">
                <header className="flex items-center justify-between p-3 border-b bg-muted/30">
                  <h2 className="flex items-center text-lg font-semibold truncate text-muted-foreground">
                    Editing: {activeRequest.name}
                    
                    {/* Unsaved Indicator (Small Dot) */}
                    {isUnsaved && (
                      <span 
                        className="ml-2 h-2 w-2 rounded-full bg-yellow-500 
                                   shadow-md ring-1 ring-yellow-300/50" 
                        title="Unsaved Changes"
                      />
                    )}
                  </h2>
                  
                  {/* Save Button - Only show if the request is unsaved */}
                  {isUnsaved && (
                    <Button 
                      size="sm"
                      variant="default"
                      onClick={openSaveModal}
                      className="ml-4"
                    >
                      <SaveIcon className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  )}
                </header>
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
          
          {/* Save Request Modal */}
          <SaveRequestModal
            isModalOpen={isSaveModalOpen}
            setIsModalOpen={handleCloseSaveModal}
          />
        </>
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