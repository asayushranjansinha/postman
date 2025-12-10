import { toast } from "sonner";
import { useRouter } from "next/navigation"; 

import { AlertModal } from "@/components/shared/AlertModal";
import { Button } from "@/components/ui/button";

import { useDeleteWorkspaceMutation } from "@/features/workspace/mutations";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  workspaceId: string; 
  workspaceName: string; 
};

export const DeleteWorkspaceModal = ({
  isModalOpen,
  setIsModalOpen,
  workspaceId, 
  workspaceName, 
}: Props) => {
  const deleteWorkspace = useDeleteWorkspaceMutation(workspaceId);
  const router = useRouter(); 

  const handleDelete = () => {
    deleteWorkspace.mutate(undefined, {
      onSuccess(data) {
        if (!data || !data.success) {
          toast.error("Failed to delete workspace", {
            description: data.message,
          });
          return;
        }

        toast.success("Workspace deleted successfully", {
          description: `The workspace "${workspaceName}" has been permanently removed.`,
        });

        setIsModalOpen(false);
        router.push("/workspaces");
      },
      onError(error) {
        toast.error("Failed to delete workspace", {
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
      title="Delete Workspace"
      description="This action cannot be undone and will permanently remove all associated data."
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete the workspace{" "}
          <span className="font-semibold text-destructive">
            "{workspaceName}"
          </span>
          ? All data and projects within this workspace will be lost.
        </p>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={deleteWorkspace.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteWorkspace.isPending}
          >
            {deleteWorkspace.isPending ? "Deleting..." : "Delete Workspace"}
          </Button>
        </div>
      </div>
    </AlertModal>
  );
};
