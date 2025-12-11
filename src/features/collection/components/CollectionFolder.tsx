import {
  ChevronDown,
  ChevronRight,
  Edit,
  EllipsisVertical,
  FilePlus,
  Loader2Icon,
  Trash,
  Package,
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
  DropdownMenuSeparator,
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
import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";

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
        size="icon"
        className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <EllipsisVertical className="size-4 text-muted-foreground" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-48" align="end">
      <DropdownMenuItem onClick={openAddRequestModal}>
        <FilePlus className="mr-2 size-3.5 text-green-500" />
        New Request
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={openEditCollectionModal}>
        <Edit className="mr-2 size-3.5 text-blue-500" />
        Rename Collection
      </DropdownMenuItem>

      <DropdownMenuItem onClick={openDeleteCollectionModal} className="text-red-600 focus:text-red-600">
        <Trash className="mr-2 size-3.5 text-red-500" />
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
  <div className="group">
    <div className="flex justify-between items-center rounded-md px-2 py-1.5 min-w-0 hover:bg-muted transition-colors">
      <CollapsibleTrigger
        className="flex flex-row items-center gap-2 flex-1 bg-transparent min-w-0 overflow-hidden py-0.5"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="flex items-center gap-1.5 min-w-0 overflow-hidden">
          {isCollapsed ? (
            <ChevronDown className="size-4 text-primary shrink-0" />
          ) : (
            <ChevronRight className="size-4 text-primary shrink-0" />
          )}
          <Package className="size-4 text-primary shrink-0" /> 
          <span className="text-sm font-semibold truncate text-foreground">
            {collection.name}
          </span>
        </span>
      </CollapsibleTrigger>

      <div className="flex items-center gap-1 shrink-0">
        <ToolTipHint label="Add New Request">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 opacity-0 group-hover:opacity-100 transition-opacity text-green-500 hover:text-green-600"
            onClick={openAddRequestModal}
          >
            <FilePlus className="size-4" />
          </Button>
        </ToolTipHint>

        <CollectionActionDropdown
          openAddRequestModal={openAddRequestModal}
          openEditCollectionModal={openEditCollectionModal}
          openDeleteCollectionModal={openDeleteCollectionModal}
        />
      </div>
    </div>
  </div>
);

interface RequestRowActionsProps {
  request: PrismaRequest;
  openEditRequestModal: (request: PrismaRequest) => void;
  openDeleteRequestModal: (request: PrismaRequest) => void;
}

const RequestRowActions = ({
  request,
  openEditRequestModal,
  openDeleteRequestModal,
}: RequestRowActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <EllipsisVertical className="size-4 text-muted-foreground" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-36" align="end">
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          openEditRequestModal(request);
        }}
      >
        <Edit className="mr-2 size-3.5 text-blue-500" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          openDeleteRequestModal(request);
        }}
        className="text-red-600 focus:text-red-600"
      >
        <Trash className="mr-2 size-3.5 text-red-500" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);


interface Props {
  collection: PrismaCollectionWithWorkspaceID;
}

export const CollectionFolder = ({ collection }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState<PrismaRequest | null>(
    null
  );

  const {
    data: requestsData,
    isLoading: requestsLoading,
    isError: requestsError,
  } = useListRequestsByCollectionIdQuery(collection.id);
  
  const requests = requestsData?.data || [];
  const hasRequests = requests.length > 0;

  const { openRequestTab } = useRequestEditorStore();
  
  const openCreateRequestModal = () => setShowCreateRequestModal(true);
  const openEditRequestModal = (request: PrismaRequest) => {
    setSelectedRequest(request);
    setShowEditRequestModal(true);
  };
  const openDeleteRequestModal = (request: PrismaRequest) => {
    setSelectedRequest(request);
    setShowDeleteRequestModal(true);
  };

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
            <div className="w-full text-xs text-muted-foreground">
              {requestsLoading ? (
                <div className="pl-4 ml-2 text-xs text-muted-foreground py-2 flex items-center gap-2">
                  <Loader2Icon className="size-3 animate-spin" />
                  Loading requests...
                </div>
              ) : requestsError ? (
                <div className="pl-4 ml-2 text-xs text-red-500 py-2">
                  Failed to load requests
                </div>
              ) : hasRequests ? (
                <div className="pl-4 ml-2 space-y-0.5 pt-1 pb-1"> 
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      onClick={(e) => {
                        e.preventDefault();
                        openRequestTab(request); 
                      }}
                      className="group flex items-center justify-between py-1.5 px-2 hover:bg-muted rounded-md cursor-pointer transition-colors min-w-0"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
                        <span
                          className={`
                            text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded-sm uppercase
                            ${
                              requestColorMap[
                                request.method as keyof typeof requestColorMap
                              ].replace('text-', 'bg-').replace('-500', '-500/20')
                            }
                            ${
                              requestColorMap[
                                request.method as keyof typeof requestColorMap
                              ]
                            }
                          `}
                        >
                          {request.method}
                        </span>

                        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                          <span className="text-sm truncate font-medium text-foreground">
                            {request.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate font-mono">
                            {request.url}
                          </span>
                        </div>
                      </div>
                      
                      <RequestRowActions
                        request={request}
                        openEditRequestModal={openEditRequestModal}
                        openDeleteRequestModal={openDeleteRequestModal}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pl-4 ml-2 text-xs text-muted-foreground py-2">
                  No requests yet in this collection.
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

      {selectedRequest && (
        <UpdateRequestModal
          isModalOpen={showEditRequestModal}
          setIsModalOpen={setShowEditRequestModal}
          initialData={{
            id: selectedRequest.id,
            name: selectedRequest.name,
            method: selectedRequest.method,
            url: selectedRequest.url,
          }}
        />
      )}

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