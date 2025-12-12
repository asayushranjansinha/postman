"use client";

import { useState } from "react";
import { LayersIcon, SearchIcon } from "lucide-react";

import { Pill } from "@/components/shared/Pill";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useListWorkspacesQuery } from "@/features/workspace/queries";
import { PrismaWorkspace } from "@/features/workspace/types";
import { CreateWorkspaceCard } from "./CreateWorkspaceCard";
import { WorkspaceCard } from "./WorkspaceCard";
import { CreateWorkspaceModal } from "./modals/CreateWorkspaceModal";
import { DeleteWorkspaceModal } from "./modals/DeleteWorkspaceModal";
import { RenameWorkspaceModal } from "./modals/RenameWorkspaceModal";

export const WorkspaceListClient = () => {
  // filter search query
  const [searchQuery, setSearchQuery] = useState("");

  // Selected workspace
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<PrismaWorkspace | null>(null);

  // Show modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Hook to get workspace list
  const { data: workspaceData } = useListWorkspacesQuery();
  const workspaces = workspaceData?.data || [];

  // Filter workspaces based on search query
  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open delete modal
  function openDeleteModal(workspace: PrismaWorkspace) {
    setSelectedWorkspace(workspace);
    setShowDeleteModal(true);
  }

  // Open rename modal
  function openRenameModal(workspace: PrismaWorkspace) {
    setSelectedWorkspace(workspace);
    setShowRenameModal(true);
  }

  // Open create modal
  function openCreateModal() {
    setShowCreateModal(true);
  }

  return (
    <>
      {/* Outer wrapper with standardized padding */}
      <div className="min-h-svh bg-background px-4 sm:px-6 lg:px-8">
        {/* Inner container with vertical padding and max-width */}
        <div className="container mx-auto py-12 space-y-7">
          {/* Page header */}
          <header className="flex flex-col gap-2">
            <Pill icon={LayersIcon} label="Workspaces" />
            <div className="flex flex-col gap-0.5">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Your Workspaces{" "}
                <span className="text-muted-foreground">
                  ({workspaces.length})
                </span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Organize and manage your API collections, environments, and team
                collaborations.
              </p>
            </div>
          </header>

          {/* Searchbar */}
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search workspace"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          {/* Show workspaces */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {filteredWorkspaces.length === 0 && searchQuery.length > 0 && (
              <p className="col-span-full text-muted-foreground">
                No workspaces found matching{" "}
                {searchQuery && <span>&quot;{searchQuery}&quot;</span>}
              </p>
            )}
            {/* The CreateWorkspaceCard should always be visible (unless filtered list is empty, but we want it available) */}
            <CreateWorkspaceCard onCreate={openCreateModal} />

            {filteredWorkspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
                onDelete={openDeleteModal}
                onRename={openRenameModal}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateWorkspaceModal
        isModalOpen={showCreateModal}
        setIsModalOpen={setShowCreateModal}
      />
      {selectedWorkspace && (
        <>
          <DeleteWorkspaceModal
            isModalOpen={showDeleteModal}
            setIsModalOpen={setShowDeleteModal}
            workspaceId={selectedWorkspace.id}
            workspaceName={selectedWorkspace.name}
          />

          <RenameWorkspaceModal
            isModalOpen={showRenameModal}
            setIsModalOpen={setShowRenameModal}
            initialData={{
              name: selectedWorkspace.name,
              id: selectedWorkspace.id,
            }}
          />
        </>
      )}
    </>
  );
};
