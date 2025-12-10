import {
  ChevronDown,
  ChevronRight,
  Edit,
  EllipsisVertical,
  FilePlus,
  Folder,
  Trash,
} from "lucide-react";
import { useState } from "react";

import { ToolTipHint } from "@/components/shared/ToolTipHint";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PrismaCollectionWithWorkspaceID } from "../types";
import { DeleteCollectionModal } from "./modals/DeleteCollectionModal";
import { RenameCollectionModal } from "./modals/RenameCollectionModal";

interface Props {
  collection: PrismaCollectionWithWorkspaceID;
}

export const CollectionFolder = ({ collection }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Collection modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Request modal states
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);

  // TODO: Request item state (needed for edit/delete)
  // const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(null);

  // Request modal handlers
  const openAddRequestModal = () => setShowAddRequestModal(true);
  const openEditRequestModal = () => setShowEditRequestModal(true);
  const openDeleteRequestModal = () => setShowDeleteRequestModal(true);

  // Collection modal handlers (this was missing earlier)
  const openEditCollectionModal = () => setShowEditModal(true);
  const openDeleteCollectionModal = () => setShowDeleteModal(true);

  return (
    <>
      <Collapsible
        open={isCollapsed}
        onOpenChange={setIsCollapsed}
        className="w-full"
      >
        <div className="flex flex-col w-full">
          <CollectionHeader
            collection={collection}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            openAddRequestModal={openAddRequestModal}
            openEditRequestModal={openEditRequestModal}
            openDeleteRequestModal={openDeleteRequestModal}
            openEditCollectionModal={openEditCollectionModal}
            openDeleteCollectionModal={openDeleteCollectionModal}
          />

          <CollapsibleContent>
            {/* TODO: Map and render collection.requests here */}
            <div className="pl-4 py-2 text-xs text-muted-foreground">
              {JSON.stringify(collection, null, 2)}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <DeleteCollectionModal
        isModalOpen={showDeleteModal}
        setIsModalOpen={setShowDeleteModal}
        collectionId={collection.id}
        collectionName={collection.name}
      />

      <RenameCollectionModal
        isModalOpen={showEditModal}
        setIsModalOpen={setShowEditModal}
        initialData={{ id: collection.id, name: collection.name }}
      />

      {/* TODO: Implement CreateRequestModal, EditRequestModal and DeleteRequestModal */}
    </>
  );
};

interface CollectionActionDropdownProps {
  openAddRequestModal: () => void;
  openEditCollectionModal: () => void;
  openDeleteCollectionModal: () => void;
}

const CollectionActionDropdown = ({
  openAddRequestModal,
  openEditCollectionModal,
  openDeleteCollectionModal,
}: CollectionActionDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="p-1.5! h-fit w-fit group cursor-pointer"
      >
        <EllipsisVertical className="size-4 group-hover:text-foreground text-muted-foreground" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuItem onClick={openAddRequestModal}>
        <FilePlus className="mr-2 size-4 text-green-400" />
        Add Request
      </DropdownMenuItem>

      <DropdownMenuItem onClick={openEditCollectionModal}>
        <Edit className="mr-2 size-4 text-blue-400" />
        Edit Collection
      </DropdownMenuItem>

      <DropdownMenuItem onClick={openDeleteCollectionModal}>
        <Trash className="mr-2 size-4 text-red-400" />
        Delete Collection
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

interface CollectionHeaderProps {
  collection: PrismaCollectionWithWorkspaceID;
  isCollapsed: boolean;
  setIsCollapsed: (open: boolean) => void;
  openAddRequestModal: () => void;
  openEditRequestModal: () => void;
  openDeleteRequestModal: () => void;
  openEditCollectionModal: () => void;
  openDeleteCollectionModal: () => void;
}

const CollectionHeader = ({
  collection,
  isCollapsed,
  setIsCollapsed,
  openAddRequestModal,
  openEditRequestModal,
  openDeleteRequestModal,
  openEditCollectionModal,
  openDeleteCollectionModal,
}: CollectionHeaderProps) => (
  <div className="flex justify-between items-center hover:bg-accent rounded-md px-2 py-2">
    <CollapsibleTrigger
      className="flex flex-row items-center gap-2 flex-1 bg-transparent"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <span className="flex items-center gap-1.5">
        {isCollapsed ? (
          <ChevronDown className="size-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="size-4 text-muted-foreground" />
        )}
        <Folder className="size-4 text-muted-foreground" />
        <span className="truncate">{collection.name}</span>
      </span>
    </CollapsibleTrigger>

    <div className="flex items-center gap-1">
      <ToolTipHint label="Add New Request">
        <Button
          variant="ghost"
          className="p-1.5! h-fit w-fit group cursor-pointer"
          onClick={openAddRequestModal}
        >
          <FilePlus className="size-4 group-hover:text-foreground text-muted-foreground" />
        </Button>
      </ToolTipHint>

      <CollectionActionDropdown
        openAddRequestModal={openAddRequestModal}
        openEditCollectionModal={openEditCollectionModal}
        openDeleteCollectionModal={openDeleteCollectionModal}
      />
    </div>
  </div>
);
