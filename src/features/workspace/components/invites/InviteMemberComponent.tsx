"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WorkspaceInviteModal } from "@/features/workspace/components/modals/WorkspaceInviteModal";

interface InviteMemberComponentProps {
  workspaceId: string;
}

export function InviteMemberComponent({
  workspaceId,
}: InviteMemberComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-4 border-b">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <WorkspaceInviteModal
        workspaceId={workspaceId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
