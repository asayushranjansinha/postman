"use client";

import {
  ExternalLinkIcon,
  HelpCircleIcon,
  Loader2,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/shared/Hint";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CollectionFolder } from "@/features/collection/components/CollectionFolder";
import { CreateCollectionModal } from "@/features/collection/components/CreateCollectionModal";
import { useCollections } from "@/features/collection/hooks/collection";
import { useWorkspaceById } from "@/features/workspace/hooks/workspace";

interface CollectionTabsProps {
  workspaceId: string;
}

export const CollectionTabs = ({ workspaceId }: CollectionTabsProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get workspace data (will use prefetched data)
  const { data: workspaceData } = useWorkspaceById(workspaceId);
  const workspace = workspaceData?.workspace;

  // Get collections (will use prefetched data)
  const { data, isLoading, isError } = useCollections(workspaceId);
  const collections = data?.collections || [];

  // Filter collections based on search query
  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state (should rarely show with proper prefetching)
  if (isLoading) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b shrink-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="text-muted-foreground">
                {workspace?.name || "Workspace"}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="font-medium">
                  Collections
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Loading collections...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b shrink-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="text-muted-foreground">
                {workspace?.name || "Workspace"}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="font-medium">
                  Collections
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 p-4 text-center">
            <p className="text-sm text-destructive">
              Failed to load collections
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b shrink-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-muted-foreground hover:text-foreground">
              {workspace?.name || "Workspace"}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="font-medium">
                Collections
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center space-x-2">
          <Hint label="Help">
            <HelpCircleIcon className="size-4 text-muted-foreground hover:text-foreground cursor-pointer" />
          </Hint>
          <Hint label="Share">
            <ExternalLinkIcon className="size-4 text-muted-foreground hover:text-foreground cursor-pointer" />
          </Hint>
        </div>
      </div>

      {/* Searchbar */}
      <div className="p-2 flex gap-4 border-b shrink-0">
        <ButtonGroup className="w-full">
          <ButtonGroup className="flex-1">
            <InputGroup className="h-8">
              <InputGroupAddon>
                <SearchIcon className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                className="text-xs"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup>
            <Hint label="Add New Collection">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setShowCreateModal(true)}
              >
                <PlusIcon />
              </Button>
            </Hint>
          </ButtonGroup>
        </ButtonGroup>
      </div>

      {/* Collections list - SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="flex flex-col divide-y divide-border min-h-full">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((collection) => (
              <div key={collection.id} className="p-2">
                <CollectionFolder collection={collection} />
              </div>
            ))
          ) : (
            <div className="flex items-center flex-1 justify-center p-8">
              <div className="flex flex-col items-center gap-3 text-center max-w-sm">
                {searchQuery ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      No collections found matching "{searchQuery}"
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear search
                    </Button>
                  </>
                ) : collections.length === 0 ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-2">
                      No collections yet
                    </p>
                    <Button size="sm" onClick={() => setShowCreateModal(true)}>
                      <PlusIcon className="size-4 mr-2" />
                      Create Collection
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No collections found
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Create collection */}
      <CreateCollectionModal
        workspaceId={workspaceId}
        isModalOpen={showCreateModal}
        setIsModalOpen={setShowCreateModal}
      />
    </div>
  );
};
