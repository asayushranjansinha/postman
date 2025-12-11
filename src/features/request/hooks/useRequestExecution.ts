import { useCallback } from "react";
import { toast } from "sonner"; // Import toast for feedback

import { useRunRequestMutation } from "@/features/request/mutations";
import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";
import { PrismaRequestRun } from "@/features/request/types";

interface UseRequestExecutionResult {
  isLoading: boolean;
  lastRun: PrismaRequestRun | null;
  handleSend: () => void;
}

/**
 * Custom hook to manage the execution of the active request, including
 * mutation handling and deriving the last run state for the UI.
 */
export const useRequestExecution = (): UseRequestExecutionResult => {
  const {
    activeRequestId,
    tabs,
    setTabData: updateStoreTabData,
  } = useRequestEditorStore();
  const executeMutation = useRunRequestMutation();

  const activeTab = activeRequestId ? tabs[activeRequestId] : null;
  const isLoading = executeMutation.isPending;
  const lastRun = activeTab?.lastRun || null;

  const handleSend = useCallback(() => {
    if (!activeRequestId || !activeTab) return;

    // Prevent execution of unsaved requests
    if (!activeTab.isSaved) {
      toast.info("Cannot run unsaved request.", {
        description:
          "Please save this request to a collection before executing it.",
        duration: 3000,
      });
      return;
    }

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
              error: response.message,
              headers: [],
            } as PrismaRequestRun,
          });
        }
      },
      onError: (error) => {
        updateStoreTabData(activeRequestId, {
          lastRun: {
            id: `client_error_${Date.now()}`,
            requestId: activeRequestId,
            executedAt: new Date(),
            status: 0,
            body: null,
            durationMs: 0,
            error: error.message,
            headers: [],
          } as PrismaRequestRun,
        });
      },
    });
  }, [activeRequestId, activeTab, executeMutation, updateStoreTabData]);

  return {
    isLoading,
    lastRun,
    handleSend,
  };
};
