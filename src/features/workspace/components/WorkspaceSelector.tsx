"use client";

import { useRouter } from "next/navigation";
import { Plus, User } from "lucide-react";
import { useEffect, useState } from "react";

import { useWorkspaceStore } from "@/store";
import { useWorkspaces } from "../hooks/workspace";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import CreateWorkspaceModal from "./CreateWorkspaceModal";

export const WorkspaceSelector = () => {
  // State to control create workspace modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  // Fetch workspaces from API
  const { data } = useWorkspaces();
  const workspaces = data?.workspaces;

  // Get selected workspace from store
  const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();

  // Function to handle create workspace
  const showModal = () => {
    setShowCreateModal(true);
  };

  // Effect to select first workspace as default
  useEffect(() => {
    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      setSelectedWorkspace(workspaces[0]);
    }
  }, [workspaces, selectedWorkspace, setSelectedWorkspace]);

  return (
    <>
      <Select
        value={selectedWorkspace?.id}
        onValueChange={(id) => {
          const ws = workspaces?.find((ws) => ws.id === id);
          if (ws) {
            setSelectedWorkspace(ws);
            router.push(`/workspaces/${ws.id}`);
          }
        }}
      >
        <SelectTrigger className="select-none w-60">
          <div className="flex justify-start items-center gap-1 min-w-0 w-full">
            <User className="size-4 shrink-0" />
            <div className="truncate min-w-0">
              <SelectValue placeholder="Select workspace" />
            </div>
          </div>
        </SelectTrigger>

        <SelectContent className="w-60 max-w-60">
          {workspaces?.map((ws) => (
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

          <div className="flex justify-between items-center select-none">
            <span className="text-sm pl-2 font-medium text-muted-foreground">
              My Workspaces
            </span>
            <Button
              size="icon-sm"
              variant="outline"
              aria-label="Add workspace"
              onClick={showModal}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </SelectContent>
      </Select>

      {/* Create workspace modal */}
      <CreateWorkspaceModal
        isModalOpen={showCreateModal}
        setIsModalOpen={setShowCreateModal}
      />
    </>
  );
};
