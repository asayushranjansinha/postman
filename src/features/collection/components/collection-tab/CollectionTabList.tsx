import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CollectionFolder } from "../CollectionFolder";

import { PrismaCollectionWithWorkspaceID } from "../../types";

interface CollectionTabListProps {
  collections: PrismaCollectionWithWorkspaceID[];
  searchQuery: string;
  onClearSearch: () => void;
  onCreateCollection: () => void;
  isLoading: boolean;
  isError: boolean;
}

export const CollectionTabList = ({
  collections,
  searchQuery,
  onClearSearch,
  onCreateCollection,
  isLoading,
  isError,
}: CollectionTabListProps) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-sm text-muted-foreground">
        Loading collections...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-sm text-destructive">
        Error loading collections.
      </div>
    );
  }

  //   Empty states
  const showEmptySearch = searchQuery && collections.length === 0;
  const showInitialEmpty = !searchQuery && collections.length === 0;

  if (showEmptySearch) {
    return (
      <div className="flex items-center flex-1 justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <p className="text-sm text-muted-foreground">
            No collections found matching "{searchQuery}"
          </p>
          <Button variant="ghost" size="sm" onClick={onClearSearch}>
            Clear search
          </Button>
        </div>
      </div>
    );
  }

  if (showInitialEmpty) {
    return (
      <div className="flex items-center flex-1 justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <p className="text-sm text-muted-foreground mb-2">
            No collections yet
          </p>
          <Button size="sm" onClick={onCreateCollection}>
            <PlusIcon className="size-4 mr-2" />
            Create Collection
          </Button>
        </div>
      </div>
    );
  }

  //   List of collections
  return (
    <div className="flex-1 overflow-y-auto min-h-0 overflow-x-hidden">
      <div className="flex flex-col divide-y divide-border min-h-full min-w-0">
        {collections.map((collection) => (
          <div key={collection.id} className="p-2 min-w-0">
            <CollectionFolder collection={collection} />
          </div>
        ))}
      </div>
    </div>
  );
};
