// CreateWorkspace.tsx
"use client";
import { toast } from "sonner";
import Modal from "@/components/shared/Modal";
import { useCreateWorkspace } from "../hooks/workspace";
import {
  CreateWorkspaceForm,
  CreateWorkspaceFormValues,
} from "./CreateWorkspaceForm";

interface CreateWorkspaceProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const CreateWorkspace = ({
  isModalOpen,
  setIsModalOpen,
}: CreateWorkspaceProps) => {
  const createWorkspace = useCreateWorkspace();

  const handleSubmit = (values: CreateWorkspaceFormValues) => {
    createWorkspace.mutate(values.name, {
      onSuccess(data) {
        toast.success(
          `Workspace "${data.workspace?.name}" created successfully`,
          {
            description: "You can now start adding projects to this workspace",
          }
        );
        setIsModalOpen(false);
      },
      onError(error) {
        toast.error("Failed to create workspace", {
          description: error.message,
        });
        console.error("Failed to create workspace:", error);
      },
    });
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
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={createWorkspace.isPending}
      />
    </Modal>
  );
};

export default CreateWorkspace;
