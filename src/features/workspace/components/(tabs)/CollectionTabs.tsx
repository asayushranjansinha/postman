import {
  ExternalLinkIcon,
  HelpCircleIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { Hint } from "@/components/shared/Hint";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ButtonGroup } from "@/components/ui/button-group";
import { useState } from "react";
import { CreateCollectionModal } from "@/features/collection/components/CreateCollectionModal";
import { Button } from "@/components/ui/button";
import { useCollections } from "@/features/collection/hooks/collection";
import { CollectionFolder } from "@/features/collection/components/CollectionFolder";

export const CollectionTabs = ({
  currentWorkspace,
}: {
  currentWorkspace: { name: string; id: string } | null;
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data } = useCollections(currentWorkspace?.id!);
  const collections = data?.collections;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b shrink-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-muted-foreground hover:text-foreground">
              {currentWorkspace?.name}
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

      {/* Searchbar - UI */}
      {/* TODO: Implement Searchbar Logic */}
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
              />
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup>
            <Hint label="Create new">
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
          {collections && collections.length > 0 ? (
            collections.map((collection) => (
              <div key={collection.id} className="p-2">
                <CollectionFolder collection={collection} />
              </div>
            ))
          ) : (
            <div className="flex items-center flex-1 justify-center text-muted-foreground select-none">
              {/* TODO: Implement No collections found UI */}
              No collections found
            </div>
          )}
        </div>
      </div>

      {/* Modal Create collection */}
      <CreateCollectionModal
        workspaceId={currentWorkspace?.id!}
        isModalOpen={showCreateModal}
        setIsModalOpen={setShowCreateModal}
      />
    </div>
  );
};
