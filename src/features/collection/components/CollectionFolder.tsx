import {
  ChevronDown,
  ChevronRight,
  Edit,
  EllipsisVertical,
  FilePlus,
  Folder,
  Loader2Icon,
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

import { CreateRequestModal } from "@/features/request/components/modals/CreateRequestModal";
import { DeleteRequestModal } from "@/features/request/components/modals/DeleteRequestModal";
import { UpdateRequestModal } from "@/features/request/components/modals/UpdateRequestModal";
import { useListRequestsByCollectionIdQuery } from "@/features/request/queries";
import { PrismaRequest } from "@/features/request/types";
import { requestColorMap } from "@/features/request/utils";
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
  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState<PrismaRequest | null>(
    null
  );

  // Hook to get requests by collection id
  const {
    data: requestsData,
    isLoading: requestsLoading,
    isError: requestsError,
  } = useListRequestsByCollectionIdQuery(collection.id);
  const requests = requestsData?.data || [];
  const hasRequests = requests.length > 0;

  // Request modal handlers
  const openCreateRequestModal = () => setShowCreateRequestModal(true);
  const openEditRequestModal = (request: PrismaRequest) => {
    setSelectedRequest(request);
    setShowEditRequestModal(true);
  };
  const openDeleteRequestModal = (request: PrismaRequest) => {
    setSelectedRequest(request);
    setShowDeleteRequestModal(true);
  };

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
            openAddRequestModal={openCreateRequestModal}
            openEditCollectionModal={openEditCollectionModal}
            openDeleteCollectionModal={openDeleteCollectionModal}
          />

          <CollapsibleContent>
            <div className="pl-4 py-2 text-xs text-muted-foreground">
              {requestsLoading ? (
                <div className="ml-3 pl-3 text-xs text-muted-foreground py-2 flex items-center gap-2">
                  <Loader2Icon className="size-3 animate-spin" />
                  Loading requests...
                </div>
              ) : requestsError ? (
                <div className="ml-3 pl-3 text-xs text-red-500 py-2">
                  Failed to load requests
                </div>
              ) : hasRequests ? (
                <div className="ml-3 border-l pl-3 space-y-1 py-1">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      onClick={(e) => {
                        e.preventDefault();
                        // openRequestTab(request);
                      }}
                      className="flex items-center justify-between py-2 px-2 hover:bg-accent rounded-md cursor-pointer group transition-colors min-w-0"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
                        <span
                          className={`text-xs font-bold shrink-0 ${
                            requestColorMap[
                              request.method as keyof typeof requestColorMap
                            ]
                          }`}
                        >
                          {request.method}
                        </span>

                        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                          <span className="text-sm truncate font-medium">
                            {request.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate font-mono">
                            {request.url}
                          </span>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger className="shrink-0">
                          <EllipsisVertical className="size-4 text-muted-foreground" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-32" align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditRequestModal(request);
                            }}
                          >
                            <Edit className="text-blue-400 mr-2 size-3" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteRequestModal(request);
                            }}
                          >
                            <Trash className="text-red-400 mr-2 size-3" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ml-6 pl-3 text-xs text-muted-foreground">
                  No requests yet
                </div>
              )}
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

      <CreateRequestModal
        isModalOpen={showCreateRequestModal}
        setIsModalOpen={setShowCreateRequestModal}
        workspaceId={collection.workspaceId}
        collectionId={collection.id}
        collectionName={collection.name}
      />

      {/* Edit request modal */}
      {selectedRequest && (
        <UpdateRequestModal
          isModalOpen={showEditRequestModal}
          setIsModalOpen={setShowEditRequestModal}
          initialData={{
            id: selectedRequest.id,
            name: selectedRequest.name,
            method: selectedRequest.method,
            url: selectedRequest.url,
            collectionId: collection.id,
            workspaceId: collection.workspaceId,
          }}
        />
      )}

      {/* Delete request modal */}
      {selectedRequest && (
        <DeleteRequestModal
          isModalOpen={showDeleteRequestModal}
          setIsModalOpen={setShowDeleteRequestModal}
          requestId={selectedRequest.id}
          requestName={selectedRequest.name}
        />
      )}
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
  openEditCollectionModal: () => void;
  openDeleteCollectionModal: () => void;
}

const CollectionHeader = ({
  collection,
  isCollapsed,
  setIsCollapsed,
  openAddRequestModal,
  openEditCollectionModal,
  openDeleteCollectionModal,
}: CollectionHeaderProps) => (
  <>
    <div className="flex justify-between items-center hover:bg-accent rounded-md px-2 py-2 min-w-0">
      <CollapsibleTrigger
        className="flex flex-row items-center gap-2 flex-1 bg-transparent min-w-0 overflow-hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="flex items-center gap-1.5 min-w-0 overflow-hidden">
          {isCollapsed ? (
            <ChevronDown className="size-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronRight className="size-4 text-muted-foreground shrink-0" />
          )}
          <Folder className="size-4 text-muted-foreground shrink-0" />
          <span className="truncate">{collection.name}</span>
        </span>
      </CollapsibleTrigger>

      <div className="flex items-center gap-1 shrink-0">
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
  </>
);
