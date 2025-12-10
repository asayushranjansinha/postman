"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/shared/Modal";
import {
  CollectionForm,
  CollectionFormValues,
} from "@/features/collection/components/forms/CollectionForm";
import { useCreateCollectionMutation } from "@/features/collection/mutations";

// Define interface for the modal props
interface CreateCollectionModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  workspaceId: string;
}

export const CreateCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  workspaceId,
}: CreateCollectionModalProps) => {
  const router = useRouter();

  // Use the mutation hook for creating
  const createCollection = useCreateCollectionMutation(workspaceId);

  const handleCreateCollection = (values: CollectionFormValues) => {
    createCollection.mutate(
      {
        name: values.name,
        workspaceId,
      },
      {
        onSuccess(data) {
          if (!data || !data.success || !data.data) {
            return toast.error("Failed to create collection", {
              description: data.message,
            });
          } else {
            toast.success(`Collection "${data.data.name}" created!`, {
              description: "You can now add requests to your new collection.",
            });
            setIsModalOpen(false);
          }
        },
        onError(error) {
          console.error(
            "[handleCreateCollection] Failed to create collection:",
            error
          );
          toast.error("Failed to create collection", {
            description: error.message,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Provide an empty object or undefined for initialData in the form for creation
  const initialDataForCreate = {
    name: "",
    description: "",
  };

  return (
    <Modal
      title="Create New Collection"
      description="Give your collection a name and an optional description."
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <CollectionForm
        initialData={undefined}
        onSubmit={handleCreateCollection}
        onCancel={handleCancel}
        isSubmitting={createCollection.isPending}
      />
    </Modal>
  );
};
