"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/shared/Modal";
import {
  WorkspaceForm,
  WorkspaceFormValues,
} from "@/features/workspace/components/forms/WorkspaceForm";
import { useRenameWorkspaceMutation } from "@/features/workspace/mutations";

interface RenameWorkspaceData {
  id: string;
  name: string;
}

interface RenameWorkspaceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  initialData: RenameWorkspaceData;
}

export const RenameWorkspaceModal = ({
  isModalOpen,
  setIsModalOpen,
  initialData,
}: RenameWorkspaceModalProps) => {
  const router = useRouter();

  // Use the mutation hook for renaming
  const renameWorkspace = useRenameWorkspaceMutation(initialData.id);

  const handleRenameWorkspace = (values: WorkspaceFormValues) => {
    // Only proceed if the name has actually changed
    if (values.name === initialData.name) {
      toast.info("No change detected", {
        description: "The workspace name is the same as before.",
      });
      setIsModalOpen(false);
      return;
    }

    renameWorkspace.mutate(
      {
        name: values.name,
      },
      {
        onSuccess(data) {
          if (!data || !data.success || !data.data) {
            return toast.error("Failed to rename workspace", {
              description: data.message,
            });
          } else {
            toast.success(`Workspace renamed to "${data.data.name}"`, {
              description: "Name update complete.",
            });
            setIsModalOpen(false);
          }
        },
        onError(error) {
          console.error(
            "[handleRenameWorkspace] Failed to rename workspace:",
            error
          );
          toast.error("Failed to rename workspace", {
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
      title="Rename Workspace"
      description={`Rename the workspace currently named "${initialData.name}"`}
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <WorkspaceForm
        initialData={initialData}
        onSubmit={handleRenameWorkspace}
        onCancel={handleCancel}
        isSubmitting={renameWorkspace.isPending}
      />
    </Modal>
  );
};
