"use client";

import { toast } from "sonner";

import { Modal } from "@/components/shared/Modal";
import {
  CollectionForm,
  CollectionFormValues,
} from "@/features/collection/components/forms/CollectionForm";
import { useRenameCollectionMutation } from "@/features/collection/mutations";

interface RenameCollectionData {
  id: string;
  name: string;
}

interface RenameCollectionModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  initialData: RenameCollectionData;
}

export const RenameCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  initialData,
}: RenameCollectionModalProps) => {

  // Use the mutation hook for renaming
  const renameCollection = useRenameCollectionMutation(initialData.id);

  const handleRenameCollection = (values: CollectionFormValues) => {
    // Check if both name and description are unchanged
    const isNameUnchanged = values.name === initialData.name;
    if (isNameUnchanged) {
      toast.info("No change detected", {
        description: "The collection details are the same as before.",
      });
      setIsModalOpen(false);
      return;
    }

    renameCollection.mutate(
      {
        name: values.name,
      },
      {
        onSuccess(data) {
          if (!data || !data.success || !data.data) {
            return toast.error("Failed to rename collection", {
              description: data.message,
            });
          } else {
            toast.success(`Collection renamed to "${data.data.name}"`, {
              description: "Details update complete.",
            });
            setIsModalOpen(false);
          }
        },
        onError(error) {
          console.error(
            "[handleRenameCollection] Failed to rename collection:",
            error
          );
          toast.error("Failed to update collection", {
            description: error.message,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Edit Collection"
      description={`Update the details for the collection currently named "${initialData.name}"`}
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <CollectionForm
        initialData={initialData}
        onSubmit={handleRenameCollection}
        onCancel={handleCancel}
        isSubmitting={renameCollection.isPending}
      />
    </Modal>
  );
};
