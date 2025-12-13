"use client";

import { toast } from "sonner";

import { Modal } from "@/components/shared/Modal";
import { WorkspaceInviteForm } from "@/features/workspace/components/forms/WorkspaceInviteForm";
import { useSendWorkspaceInviteMutation } from "@/features/workspace/mutations";
import { AllowedInviteRoles } from "@/features/workspace/types";

interface WorkspaceInviteModalProps {
  workspaceId: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const WorkspaceInviteModal = ({
  workspaceId,
  isModalOpen,
  setIsModalOpen,
}: WorkspaceInviteModalProps) => {
  const inviteMutation = useSendWorkspaceInviteMutation();

  const handleInvite = async ({
    role,
  }: {
    role: AllowedInviteRoles;
  }): Promise<string | null> => {
    return new Promise((resolve) => {
      inviteMutation.mutate(
        {
          workspaceId,
          role,
        },
        {
          onSuccess(data) {
            if (!data || !data.success || !data.data?.token) {
              toast.error("Failed to generate invite");
              return resolve(null);
            }

            toast.success("Invite generated");
            resolve(data.data.token);
          },
          onError(error) {
            console.error("[WorkspaceInviteModal] Invite failed:", error);
            toast.error("Failed to generate invite", {
              description: error.message,
            });
            resolve(null);
          },
        }
      );
    });
  };

  return (
    <Modal
      title="Invite Member"
      description="Generate an invite link to add a member to this workspace"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <WorkspaceInviteForm
        workspaceId={workspaceId}
        onSubmit={handleInvite}
        onCancel={() => setIsModalOpen(false)}
        isSubmitting={inviteMutation.isPending}
      />
    </Modal>
  );
};
