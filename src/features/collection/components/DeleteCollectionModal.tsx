"use client";

import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/shared/AlertModal";
import { useDeleteCollection } from "../hooks/collection";

export const DeleteCollectionModal = ({
  isModalOpen,
  setIsModalOpen,
  collectionId,
  collectionName,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  collectionId: string;
  collectionName: string;
}) => {
  const deleteCollection = useDeleteCollection();

  const handleDelete = async () => {
    deleteCollection.mutate(collectionId, {
      onSuccess() {
        toast.success("Collection deleted successfully");
        setIsModalOpen(false);
      },
      onError(err) {
        toast.error("Failed to delete collection", {
          description: err.message,
        });
        console.error("Delete collection error:", err);
      },
    });
  };

  return (
    <AlertModal
      title="Delete Collection"
      description="This action cannot be undone."
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="max-w-sm"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete the collection{" "}
          <span className="font-semibold text-foreground">
            "{collectionName}"
          </span>
          ?
        </p>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="ghost"
            onClick={() => setIsModalOpen(false)}
            disabled={deleteCollection.isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteCollection.isPending}
          >
            {deleteCollection.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </AlertModal>
  );
};
