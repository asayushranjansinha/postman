"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";

import { useGetWorkspaceQuery } from "@/features/workspace/queries";

import { CollectionTabHeader } from "./CollectionTabHeader";
import { CollectionTabSearchbar } from "./CollectionTabSearchbar";
import { CollectionTabList } from "./CollectionTabList";
import { CreateCollectionModal } from "../modals/CreateCollectionModal";

import { useCollectionsByWorkspaceQuery } from "../../queries";

export const CollectionTab = () => {
  // Get workspace ID from params
  const { workspaceId } = useParams() as { workspaceId: string };

  // State for modal and search
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Data fetching
  const { data: workspaceData } = useGetWorkspaceQuery(workspaceId);
  const workspaceName = workspaceData?.data?.name;

  const {
    data: collectionsData,
    isLoading,
    isError,
  } = useCollectionsByWorkspaceQuery(workspaceId);
  const collections = collectionsData?.data || [];

  // Filter collections using useMemo for performance
  const filteredCollections = useMemo(() => {
    if (!searchQuery) return collections;

    return collections.filter((collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [collections, searchQuery]);

  // Handle modal and search
  const handleClearSearch = () => setSearchQuery("");
  const handleCreateClick = () => setShowCreateModal(true);

  return (
    <>
      <div className="h-full flex flex-col overflow-hidden max-w-full">
        {/*  Header Component */}
        <CollectionTabHeader workspaceName={workspaceName} />

        {/* Searchbar Component */}
        <CollectionTabSearchbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateClick={handleCreateClick}
        />

        {/* Collections List Component */}
        <CollectionTabList
          collections={filteredCollections}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
          onCreateCollection={handleCreateClick}
          isLoading={isLoading}
          isError={isError}
        />
      </div>

      <CreateCollectionModal
        workspaceId={workspaceId}
        isModalOpen={showCreateModal}
        setIsModalOpen={setShowCreateModal}
      />
    </>
  );
};
