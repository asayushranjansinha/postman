"use client";

import { Plus, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useWorkspaces } from "../hooks/workspace";
import CreateWorkspaceModal from "./CreateWorkspaceModal";

export const WorkspaceSelector = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();
  const params = useParams();

  // Get current workspace ID from URL (will be undefined on /workspaces)
  const currentWorkspaceId = params.workspaceId as string | undefined;

  // Fetch workspaces (uses prefetched data)
  const { data } = useWorkspaces();
  const workspaces = data?.workspaces || [];

  // Find current workspace from URL
  const currentWorkspace = workspaces.find(
    (ws) => ws.id === currentWorkspaceId
  );

  // Handle workspace change
  const handleWorkspaceChange = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`);
  };

  return (
    <>
      <Select value={currentWorkspaceId} onValueChange={handleWorkspaceChange}>
        <SelectTrigger className="select-none w-60">
          <div className="flex justify-start items-center gap-1 min-w-0 w-full">
            <User className="size-4 shrink-0" />
            <div className="truncate min-w-0">
              {currentWorkspace ? (
                <span className="truncate">
                  {currentWorkspace.name.charAt(0).toUpperCase() +
                    currentWorkspace.name.slice(1)}
                </span>
              ) : (
                <span className="text-muted-foreground">Select workspace</span>
              )}
            </div>
          </div>
        </SelectTrigger>
        <SelectContent className="w-60 max-w-60">
          {workspaces.map((ws) => (
            <SelectItem
              key={ws.id}
              value={ws.id}
              className="w-full overflow-hidden"
            >
              <div className="flex justify-start items-center gap-1 min-w-0 w-full">
                <span className="truncate whitespace-nowrap overflow-hidden w-full">
                  {ws.name.charAt(0).toUpperCase() + ws.name.slice(1)}
                </span>
              </div>
            </SelectItem>
          ))}
          <Separator className="my-1" />
          <div className="flex justify-between items-center select-none px-2 py-1.5">
            <span className="text-sm font-medium text-muted-foreground">
              My Workspaces
            </span>
            <Button
              size="icon-sm"
              variant="outline"
              aria-label="Add workspace"
              onClick={(e) => {
                e.stopPropagation();
                setShowCreateModal(true);
              }}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </SelectContent>
      </Select>

      <CreateWorkspaceModal
        isModalOpen={showCreateModal}
        setIsModalOpen={setShowCreateModal}
      />
    </>
  );
};
