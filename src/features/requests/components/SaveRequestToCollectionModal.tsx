import { RequestMethod } from "@prisma/client";
import { toast } from "sonner";

import Modal from "@/components/shared/Modal";
import { useCollections } from "@/features/collection/hooks/collection";
import { useWorkspaceById } from "@/features/workspace/hooks/workspace";
import { useAddRequestToCollectionMutation } from "../hooks/request";
import { SaveRequestForm, SaveRequestFormValues } from "./SaveRequestForm";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  workspaceId: string;
  preSelectedCollectionId?: string;
  initialRequestData?: {
    name?: string;
    url?: string;
    method?: RequestMethod;
  };
};

export const SaveRequestToCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  workspaceId, //  Receive workspaceId as prop
  preSelectedCollectionId,
  initialRequestData,
}: Props) => {
  //  Get workspace data from query cache (prefetched)
  const { data: workspaceData } = useWorkspaceById(workspaceId);
  const workspace = workspaceData?.workspace;

  const {
    data,
    isLoading: isCollectionsLoading,
    isError,
  } = useCollections(workspaceId);

  const addRequest = useAddRequestToCollectionMutation();

  const handleSubmit = (values: SaveRequestFormValues) => {
    addRequest.mutate(
      {
        collectionId: values.collectionId,
        request: {
          name: values.name,
          url: values.url,
          method: values.method,
        },
      },
      {
        onSuccess(data) {
          if (!data || !data.success) {
            toast.error("Failed to save request", {
              description: data.error,
            });
            return;
          }
          toast.success("Request saved successfully");
          setIsModalOpen(false);
        },
        onError(error) {
          toast.error("Failed to save request", {
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
        title="Save Request"
        description="Add this request to a collection"
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
  if (isError || collections.length === 0) {
    return (
      <Modal
        title="Save Request"
        description="Add this request to a collection"
        isOpen={isModalOpen}
        onClose={handleCancel}
      >
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">
            {isError
              ? "Failed to load collections"
              : "No collections available. Please create a collection first."}
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Save Request"
      description="Add this request to a collection"
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <SaveRequestForm
        workspaceId={workspaceId}
        workspaceName={workspace?.name}
        collections={collections}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={addRequest.isPending}
        initialData={{
          ...initialRequestData,
          collectionId: preSelectedCollectionId || "",
        }}
      />
    </Modal>
  );
};
