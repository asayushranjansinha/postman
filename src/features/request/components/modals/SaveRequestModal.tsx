"use client";

import { useParams } from "next/navigation";
import { toast } from "sonner";
import { PrismaRequestDetails } from "@/features/request/types";

import { Modal } from "@/components/shared/Modal";
import { useCollectionsByWorkspaceQuery } from "@/features/collection/queries";
import {
  SaveRequestForm,
  SaveRequestFormValues,
} from "@/features/request/components/forms/SaveRequestForm";
import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";

import {
  useSaveUnsavedRequestMutation,
  useUpdateRequestMutation,
} from "@/features/request/mutations";

interface SaveRequestModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const SaveRequestModal = ({
  isModalOpen,
  setIsModalOpen,
}: SaveRequestModalProps) => {
  // 1. Get workspaceId from URL params
  const { workspaceId } = useParams() as { workspaceId: string };

  // 2. Fetch collections for the Select input
  const { data: collectionsData, isLoading: isLoadingCollections } =
    useCollectionsByWorkspaceQuery(workspaceId);
  const collections = collectionsData?.data || [];

  // 3. Get active request data and store actions
  const store = useRequestEditorStore();
  const { activeRequestId, tabs, setTabData, closeRequestTab, openRequestTab } =
    store;
  const activeTab = activeRequestId ? tabs[activeRequestId] : null;

  // Ensure we have a request to save
  if (!activeTab || !activeRequestId) return null;

  // Logic to determine if this is a CREATE or an UPDATE/MOVE
  const isNewSave = activeTab.collectionId === "";

  // 4. Initialize mutation hooks conditionally
  const updateMutation = useUpdateRequestMutation(activeRequestId);
  const createMutation = useSaveUnsavedRequestMutation();

  const isSubmitting = isNewSave
    ? createMutation.isPending
    : updateMutation.isPending;

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSaveRequest = (formValues: SaveRequestFormValues) => {
    const { name: newName, collectionId: newCollectionId } = formValues;

    if (isNewSave) {
      const createPayload = {
        workspaceId,
        collectionId: newCollectionId,
        name: newName,
        url: activeTab.url,
        method: activeTab.method,
        body: activeTab.body,
        headers: activeTab.headers,
        queryParams: activeTab.queryParams,
      };

      createMutation.mutate(createPayload, {
        onSuccess(response) {
          if (!response.success || !response.data) {
            return toast.error("Failed to create request", {
              description: response.message,
            });
          }

          const newRequestDetails = response.data as PrismaRequestDetails;
          const newId = newRequestDetails.id;

          // STEP 1: Close the old temporary tab
          closeRequestTab(activeRequestId);

          // STEP 2: Open a new tab with the permanent DB details (this also sets it as active)
          openRequestTab(newRequestDetails);

          toast.success(`Request "${newName}" created and saved`, {
            description: `Added to collection ID: ${newCollectionId}.`,
          });
          setIsModalOpen(false);
        },
        onError(error) {
          toast.error("Failed to create request", {
            description: error.message,
          });
        },
      });
    } else {

      const updatePayload = {
        // ID is closed over in the hook
        workspaceId: workspaceId,
        collectionId: newCollectionId, // New collection ID (or old one if just renaming)
        name: newName,
        url: activeTab.url,
        method: activeTab.method,
      };

      // Since the request structure does not include a mutation to move the collection,
      // we assume the UpdateRequestMutation handles renaming/updating basic metadata.
      // NOTE: Moving collections requires an extra field/mutation logic in the server action.
      // For now, we only update the store if successful.

      updateMutation.mutate(updatePayload, {
        onSuccess(response) {
          if (!response.success || !response.data) {
            return toast.error("Failed to update request", {
              description: response.message,
            });
          }

          // Update the store data
          setTabData(activeRequestId, {
            name: newName,
            collectionId: newCollectionId,
            isSaved: true,
            // The permanent ID remains the same here
          });

          toast.success(`Request "${newName}" updated successfully`, {
            description: `Details saved.`,
          });
          setIsModalOpen(false);
        },
        onError(error) {
          toast.error("Failed to update request", {
            description: error.message,
          });
        },
      });
    }
  };

  const modalTitle = isNewSave ? "Save New Request" : "Move & Rename Request";

  // Don't show the form until essential data is loaded
  const showLoading = isLoadingCollections || !activeTab;

  return (
    <Modal
      title={modalTitle}
      description={
        isNewSave
          ? "Select a collection to save your new request."
          : "Update request details and select a target collection."
      }
      isOpen={isModalOpen}
      onClose={handleCancel}
      className="max-w-md"
    >
      {showLoading ? (
        <div className="flex justify-center items-center h-24 text-muted-foreground">
          Loading Collections...
        </div>
      ) : (
        <SaveRequestForm
          initialData={{
            id: activeTab.id,
            name: activeTab.name,
            collectionId: activeTab.collectionId,
          }}
          collections={collections}
          onSubmit={handleSaveRequest}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}
    </Modal>
  );
};
