"use client";
import { toast } from "sonner";

import Modal from "@/components/shared/Modal";

import { CreateCollectionForm, CreateCollectionFormValues } from "./CreateCollectionForm";

import { useCreateCollection } from "../hooks/collection";

interface CreateCollectionModal {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  workspaceId: string;
}

export const CreateCollectionModal = ({
  workspaceId,
  isModalOpen,
  setIsModalOpen,
}: CreateCollectionModal) => {
  const createCollection = useCreateCollection();

  const handleSubmit = async (values: CreateCollectionFormValues) => {

    if (!values.name.trim()) {
      toast.error("Collection name is required");
      return;
    }

    createCollection.mutate(
      {
        name: values.name,
        workspaceId,
      },
      {
        onSuccess(data) {
          toast.success(
            `Collection "${data.collection?.name}" created successfully`,
            {
              description:
                "You can now start adding requests to this collection",
            }
          );
          setIsModalOpen(false);
        },
        onError(error) {
          toast.error("Failed to create collection", {
            description: error.message,
          });
          console.error("Failed to create collection:", error);
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Add New Collection"
      description="Create a new collection to organize your requests"
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <CreateCollectionForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={createCollection.isPending}
      />
    </Modal>
  );
};
