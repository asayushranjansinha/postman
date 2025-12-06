"use client";

import { toast } from "sonner";
import Modal from "@/components/shared/Modal";
import {
  EditCollectionForm,
  EditCollectionFormValues,
} from "./EditCollectionForm";
import { useUpdateCollection } from "../hooks/collection";

interface EditCollectionModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  collectionId: string;
  initialData: { name: string };
}

export const EditCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  collectionId,
  initialData,
}: EditCollectionModalProps) => {
  const updateCollection = useUpdateCollection();

  const handleSubmit = async (values: EditCollectionFormValues) => {
    if (!values.name.trim()) {
      toast.error("Collection name is required");
      return;
    }

    updateCollection.mutate(
      {
        collectionId,
        name: values.name,
      },
      {
        onSuccess(data) {
          toast.success(`Collection updated successfully`, {
            description: "Your changes have been saved",
          });
          setIsModalOpen(false);
        },
        onError(error) {
          toast.error("Failed to update collection", {
            description: error.message,
          });
          console.error("Update collection error:", error);
        },
      }
    );
  };

  return (
    <Modal
      title="Edit Collection"
      description="Update your collection details"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <EditCollectionForm
        onSubmit={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        isSubmitting={updateCollection.isPending}
        initialData={initialData}
      />
    </Modal>
  );
};
