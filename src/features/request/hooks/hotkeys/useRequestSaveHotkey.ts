import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";
import { useUpdateRequestMutation } from "@/features/request/mutations"; 

/**
 * Custom hook that manages the request save mutation and registers the Ctrl+S/Cmd+S hotkey.
 */
export const useRequestSaveHotkey = () => {
  const { workspaceId } = useParams() as { workspaceId: string };
  const { activeRequestId, tabs } = useRequestEditorStore();

  const activeTab = activeRequestId ? tabs[activeRequestId] : null;

  // 1. Initialize the update mutation
  const updateMutation = useUpdateRequestMutation();
  const isSaving = updateMutation.isPending;

  // 2. Define the save request logic
  const saveRequest = useCallback(() => {
    if (!activeRequestId || !activeTab) return;

    // --- NEW CHECK: PREVENT SAVING UNSAVED REQUESTS ---
    // If collectionId is an empty string, the request is unsaved and must be created
    // in a collection first (handled via a separate UI/action).
    if (activeTab.collectionId === "") {
      toast.info("Cannot Quick-Save", {
        description: "This is a new request. Please save it into a Collection first.",
        duration: 3000,
      });
      return;
    }
    // --------------------------------------------------

    const payload = {
      workspaceId,
      // Note: If this request was edited (e.g., URL change) after being loaded, it might
      // still be marked as saved, but the mutation will handle the actual update logic.
      collectionId: activeTab.collectionId, 
      name: activeTab.name,
      url: activeTab.url,
      method: activeTab.method,
    };

    updateMutation.mutate({ ...payload, id: activeRequestId }, {
      onSuccess: (data) => {
        if (data.success) {
          // You might also want to set the isSaved flag to true here if you implement
          // a "dirty state" tracking system.
          toast.success("Request saved successfully", {
            description: `${activeTab.name} saved successfully`,
          });
        } else {
          toast.error("Failed to save request", {
            description: data.message,
          });
        }
      },
      onError: (error) => {
        toast.error("Failed to save request", {
          description: error.message,
        });
      },
    });
  }, [activeRequestId, activeTab, workspaceId, updateMutation]);

  // 3. Register the hotkey
  useHotkeys(
    "ctrl+s, meta+s",
    (event) => {
      // Prevent default browser save behavior
      event.preventDefault();
      event.stopPropagation();
      saveRequest();
    },
    { preventDefault: true, enableOnFormTags: true },
    [activeRequestId, saveRequest]
  );
  
  return {
    saveRequest,
    isSaving,
  };
};