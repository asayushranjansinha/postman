// features/requests/components/DeleteRequestModal.tsx
import { toast } from "sonner";

import { AlertModal } from "@/components/shared/AlertModal";
import { Button } from "@/components/ui/button";
import { useDeleteRequestMutation } from "../hooks/request";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  requestId: string;
  requestName: string;
};

export const DeleteRequestModal = ({
  isModalOpen,
  setIsModalOpen,
  requestId,
  requestName,
}: Props) => {
  const deleteRequest = useDeleteRequestMutation();

  const handleDelete = () => {
    deleteRequest.mutate(requestId, {
      onSuccess(data) {
        if (!data || !data.success) {
          toast.error("Failed to delete request", {
            description: data.error,
          });
          return;
        }
        toast.success("Request deleted successfully");
        setIsModalOpen(false);
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
      description="This action cannot be undone"
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete the request{" "}
          <span className="font-semibold text-foreground">"{requestName}"</span>
          ?
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