"use client";

import { toast } from "sonner";

import { Modal } from "@/components/shared/Modal";
import {
  CreateWorkspaceForm,
  CreateWorkspaceFormValues,
} from "@/features/workspace/components/forms/CreateWorkspaceForm";
import { useCreateWorkspaceMutation } from "@/features/workspace/mutations";
import { useRouter } from "next/navigation";

interface CreateWorkspaceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const CreateWorkspaceModal = ({
  isModalOpen,
  setIsModalOpen,
}: CreateWorkspaceModalProps) => {
  const router = useRouter();
  const createWorkspace = useCreateWorkspaceMutation();

  const handleCreateWorkspace = (values: CreateWorkspaceFormValues) => {
    createWorkspace.mutate(
      {
        name: values.name,
      },
      {
        onSuccess(data) {
          if (!data || !data.success || !data.data) {
            return toast.error("Failed to create workspace", {
              description: data.message,
            });
          } else {
            toast.success(`Workspace "${data.data.name}" created successfully`, {
              description: "Redirecting to workspace page",
            });
            router.push(`/workspace/${data.data.id}`);
            setIsModalOpen(false);
          }
        },
        onError(error) {
          console.error(
            "[handleCreateWorkspace] Failed to create workspace:",
            error
          );
          toast.error("Failed to create workspace", {
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
      title="Add New Workspace"
      description="Create a new workspace to organize your projects"
      isOpen={isModalOpen}
      onClose={handleCancel}
    >
      <CreateWorkspaceForm
        onSubmit={handleCreateWorkspace}
        onCancel={handleCancel}
        isSubmitting={createWorkspace.isPending}
      />
    </Modal>
  );
};
