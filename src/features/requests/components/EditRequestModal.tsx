// features/requests/components/EditRequestModal.tsx
import { RequestMethod } from "@prisma/client";
import { toast } from "sonner";

import Modal from "@/components/shared/Modal";
import { useCollections } from "@/features/collection/hooks/collection";
import { useWorkspaceById } from "@/features/workspace/hooks/workspace";
import { SaveRequestForm, SaveRequestFormValues } from "./SaveRequestForm";
import { useUpdateRequestMutation } from "../hooks/request";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  workspaceId: string;
  requestId: string;
  initialData: {
    name: string;
    url: string;
    method: RequestMethod;
    collectionId: string;
  };
};

export const EditRequestModal = ({
  isModalOpen,
  setIsModalOpen,
  workspaceId,
  requestId,
  initialData,
}: Props) => {
  // Get workspace data (This will use prefetched data)
  const { data: workspaceData } = useWorkspaceById(workspaceId);
  const workspace = workspaceData?.workspace;

  const {
    data,
    isLoading: isCollectionsLoading,
    isError,
  } = useCollections(workspaceId);

  const updateRequest = useUpdateRequestMutation();

  const handleSubmit = (values: SaveRequestFormValues) => {
    updateRequest.mutate(
      {
        requestId,
        data: {
          name: values.name,
          url: values.url,
          method: values.method,
        },
      },
      {
        onSuccess(data) {
          if (!data || !data.success) {
            toast.error("Failed to update request", {
              description: data.error,
            });
            return;
          }
          toast.success("Request updated successfully");
          setIsModalOpen(false);
        },
        onError(error) {
          toast.error("Failed to update request", {
            description: error.message,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const collections = data?.collections || [];

  // Show loading state if needed
  if (isCollectionsLoading) {
    return (
      <Modal
        title="Edit Request"
        description="Update this request"
        isOpen={isModalOpen}
        onClose={handleCancel}
      >
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">
            Loading collections...
          </p>
        </div>
      </Modal>
    );
  }

  // Show error state if needed
  if (isError) {
    return (
      <Modal
        title="Edit Request"
        description="Update this request"
        isOpen={isModalOpen}
        onClose={handleCancel}
      >
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">
            Failed to load collections
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Edit Request"
      description="Update this request"
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <SaveRequestForm
        workspaceId={workspaceId}
        workspaceName={workspace?.name}
        collections={collections}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={updateRequest.isPending}
        initialData={initialData}
        isEditMode={true}
      />
    </Modal>
  );
};
