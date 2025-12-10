"use client";

import { toast } from "sonner";

import { AlertModal } from "@/components/shared/AlertModal";
import { Button } from "@/components/ui/button";
import { useDeleteCollectionMutation } from "@/features/collection/mutations";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  collectionId: string;
  collectionName: string;
};

export const DeleteCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  collectionId,
  collectionName,
}: Props) => {
  const deleteCollection = useDeleteCollectionMutation(collectionId);

  const handleDelete = () => {
    deleteCollection.mutate(undefined, {
      onSuccess(data) {
        if (!data || !data.success) {
          toast.error("Failed to delete collection", {
            description: data?.message || "An unknown error occurred.",
          });
          return;
        }

        toast.success("Collection deleted successfully", {
          description: `The collection "${collectionName}" has been permanently removed.`,
        });

        setIsModalOpen(false);
      },
      onError(error) {
        toast.error("Failed to delete collection", {
          description: error.message,
        });
        console.error("Delete collection error:", error);
      },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <AlertModal
      title="Delete Collection"
      description="This action cannot be undone and will permanently remove all associated data within this collection."
      isOpen={isModalOpen}
      onClose={handleCancel}
      className="max-w-sm"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete the collection{" "}
          <span className="font-semibold text-destructive">
            "{collectionName}"
          </span>
          ? All requests within this collection will be lost.
        </p>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={deleteCollection.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteCollection.isPending}
          >
            {deleteCollection.isPending ? "Deleting..." : "Delete Collection"}
          </Button>
        </div>
      </div>
    </AlertModal>
  );
};
