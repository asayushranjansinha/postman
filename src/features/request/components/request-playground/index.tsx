"use client";

import { PencilIcon, SaveIcon } from "lucide-react";
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
import { useNewRequestHotkey } from "@/features/request/hooks/hotkeys/useNewRequestHotkey";
import { useRequestSaveHotkey } from "@/features/request/hooks/hotkeys/useRequestSaveHotkey";
import { useRequestExecution } from "@/features/request/hooks/useRequestExecution";

import { SaveRequestModal } from "@/features/request/components/modals/SaveRequestModal";
import { UpdateRequestModal } from "@/features/request/components/modals/UpdateRequestModal";
import { RequestPlaygroundEmptyState } from "./EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const RequestPlayground = () => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);

  useActiveRequestSync();
  useRequestSaveHotkey();
  useNewRequestHotkey();

  const { openTabIds, activeRequestId, tabs, newRequestTab } =
    useRequestEditorStore();

  const activeRequest = tabs[activeRequestId!] || {};
  const hasOpenTabs = openTabIds.length > 0;

  const { isLoading, lastRun, handleSend } = useRequestExecution();

  const isUnsaved = !activeRequest.isSaved;
  const isSaved = activeRequest.isSaved;

  const openSaveModal = () => setIsSaveModalOpen(true);
  const handleCloseSaveModal = () => setIsSaveModalOpen(false);

  const openEditModal = () => setShowEditRequestModal(true);
  const handleCloseEditModal = () => setShowEditRequestModal(false);

  const canShowEditModal = isSaved && activeRequest.id && activeRequest.name;

  return (
    <div className="flex flex-col w-full h-full">
      <RequestTabsHeader />

      {hasOpenTabs && activeRequestId ? (
        <>
          {/* Desktop: Resizable Panels */}
          <div className="hidden md:block flex-1">
            <ResizablePanelGroup direction="vertical" className="h-full">
              <ResizablePanel defaultSize={65} minSize={20}>
                <div className="flex flex-col h-full overflow-y-auto border-b">
                  <header className="flex items-center justify-between p-3 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                    <h2 className="flex items-center text-base font-medium truncate text-foreground">
                      {activeRequest.name}
                      {isUnsaved && (
                        <span
                          className="ml-2 h-2 w-2 rounded-full bg-yellow-500 shadow-md ring-1 ring-yellow-300/50"
                          title="Unsaved Changes"
                        />
                      )}
                    </h2>

                    <div className="flex items-center gap-2">
                      {isUnsaved && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={openSaveModal}
                        >
                          <SaveIcon className="w-3.5 h-3.5 mr-1.5" />
                          Save
                        </Button>
                      )}

                      {isSaved && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={openEditModal}
                        >
                          <PencilIcon className="w-3.5 h-3.5 mr-1.5" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </header>
                  <RequestEditorContent
                    onSend={handleSend}
                    isSending={isLoading}
                  />
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
          </div>

          {/* Mobile: Tabs Layout */}
          <div className="md:hidden flex-1 overflow-hidden">
            <Tabs defaultValue="request" className="flex flex-col h-full">
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="request" className="flex-1">
                  Request
                </TabsTrigger>
                <TabsTrigger value="response" className="flex-1">
                  Response
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="request"
                className="flex-1 overflow-hidden m-0"
              >
                <div className="flex flex-col h-full overflow-y-auto">
                  <header className="flex items-center justify-between p-3 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                    <h2 className="flex items-center text-base font-medium truncate text-foreground">
                      {activeRequest.name}
                      {isUnsaved && (
                        <span
                          className="ml-2 h-2 w-2 rounded-full bg-yellow-500 shadow-md ring-1 ring-yellow-300/50"
                          title="Unsaved Changes"
                        />
                      )}
                    </h2>

                    <div className="flex items-center gap-2">
                      {isUnsaved && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={openSaveModal}
                        >
                          <SaveIcon className="w-3.5 h-3.5 mr-1.5" />
                          Save
                        </Button>
                      )}

                      {isSaved && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={openEditModal}
                        >
                          <PencilIcon className="w-3.5 h-3.5 mr-1.5" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </header>
                  <RequestEditorContent
                    onSend={handleSend}
                    isSending={isLoading}
                  />
                </div>
              </TabsContent>

              <TabsContent
                value="response"
                className="flex-1 overflow-hidden m-0"
              >
                <div className="flex flex-col h-full overflow-y-auto">
                  <RequestRunResponseViewer
                    runData={lastRun}
                    isLoading={isLoading}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <SaveRequestModal
            isModalOpen={isSaveModalOpen}
            setIsModalOpen={handleCloseSaveModal}
          />

          {canShowEditModal && (
            <UpdateRequestModal
              isModalOpen={showEditRequestModal}
              setIsModalOpen={handleCloseEditModal}
              initialData={{
                id: activeRequest.id,
                name: activeRequest.name,
                method: activeRequest.method,
                url: activeRequest.url,
              }}
            />
          )}
        </>
      ) : (
        <RequestPlaygroundEmptyState onNewRequest={newRequestTab} />
      )}
    </div>
  );
};
