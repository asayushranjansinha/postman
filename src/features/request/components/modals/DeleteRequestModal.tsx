"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Might not be needed if only refreshing collection, but kept for consistency

import { AlertModal } from "@/components/shared/AlertModal";
import { Button } from "@/components/ui/button";

// Assume this mutation hook exists and takes the request ID
import { useDeleteRequestMutation } from "@/features/request/mutations"; 

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  requestId: string; 
  requestName: string; 
  // Add collectionId or a function to navigate back/close relevant views 
  // if the user is currently viewing the request being deleted.
};

export const DeleteRequestModal = ({
  isModalOpen,
  setIsModalOpen,
  requestId, 
  requestName, 
}: Props) => {
  // Hook to handle the deletion logic
  const deleteRequest = useDeleteRequestMutation(requestId);
  // const router = useRouter(); // Uncomment if you need navigation/redirection on successful delete

  const handleDelete = () => {
    deleteRequest.mutate(undefined, {
      onSuccess(data) {
        if (!data || !data.success) {
          toast.error("Failed to delete request", {
            description: data.message,
          });
          return;
        }

        toast.success("Request deleted successfully", {
          description: `The request "${requestName}" has been removed.`,
        });

        setIsModalOpen(false);
        // After deleting a request, you typically don't navigate away entirely, 
        // but perhaps close a sidebar/editor or navigate to the collection list.
        // If the user was viewing this request, you might need to handle closing the view here.
        // Example: router.push(`/collections/${data.collectionId}`); 
      },
      onError(error) {
        toast.error("Failed to delete request", {
          description: error.message,
        });
      },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <AlertModal
      title="Delete Request"
      description="This action cannot be undone and will permanently remove this request from the collection."
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete the request{" "}
          <span className="font-semibold text-destructive">
            "{requestName}"
          </span>
          ? All configuration (URL, headers, body, etc.) for this request will be lost.
        </p>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={deleteRequest.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteRequest.isPending}
          >
            {deleteRequest.isPending ? "Deleting..." : "Delete Request"}
          </Button>
        </div>
      </div>
    </AlertModal>
  );
};