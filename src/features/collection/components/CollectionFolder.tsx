import {
  ChevronDown,
  ChevronRight,
  Edit,
  EllipsisVertical,
  FilePlus,
  Folder,
  Loader2,
  Trash,
} from "lucide-react";
import { useState } from "react";

import { Hint } from "@/components/shared/Hint";
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

import { DeleteRequestModal } from "@/features/requests/components/DeleteRequestModal";
import { EditRequestModal } from "@/features/requests/components/EditRequestModal";
import { SaveRequestToCollectionModal } from "@/features/requests/components/SaveRequestToCollectionModal";
import { useGetAllRequestsInCollectionQuery } from "@/features/requests/hooks/request";

import { DeleteCollectionModal } from "./DeleteCollectionModal";
import { EditCollectionModal } from "./EditCollectionModal";

import { Collection } from "../types";

interface Props {
  collection: Collection;
}

const requestColorMap = {
  GET: "text-green-500",
  POST: "text-blue-500",
  PUT: "text-yellow-500",
  DELETE: "text-red-500",
  PATCH: "text-orange-500",
};

export const CollectionFolder = ({ collection }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Request modals state
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<{
    id: string;
    name: string;
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    collectionId: string;
  } | null>(null);

  const { data, isPending, isError } = useGetAllRequestsInCollectionQuery(
    collection.id
  );

  const requestData = data?.requests || [];
  const hasRequests = requestData.length > 0;

  const handleAddRequest = () => {
    setShowSaveModal(true);
  };

  const handleEditRequest = (request: any) => {
    setSelectedRequest({
      id: request.id,
      name: request.name,
      url: request.url,
      method: request.method,
      collectionId: collection.id,
    });
    setShowEditRequestModal(true);
  };

  const handleDeleteRequest = (request: any) => {
    setSelectedRequest({
      id: request.id,
      name: request.name,
      url: request.url,
      method: request.method,
      collectionId: collection.id,
    });
    setShowDeleteRequestModal(true);
  };

  return (
    <>
      <Collapsible
        open={isCollapsed}
        onOpenChange={setIsCollapsed}
        className="w-full"
      >
        <div className="flex flex-col w-full">
          {/* Folder Header */}
          <div className="flex justify-between items-center hover:bg-accent rounded-md px-2 py-2">
            <CollapsibleTrigger className="flex flex-row items-center gap-2 flex-1 bg-transparent">
              <div className="flex items-center gap-1">
                {isPending ? (
                  <Loader2 className="size-4 text-zinc-400 animate-spin" />
                ) : hasRequests ? (
                  isCollapsed ? (
                    <ChevronDown className="size-4 text-zinc-400" />
                  ) : (
                    <ChevronRight className="size-4 text-zinc-400" />
                  )
                ) : (
                  <div className="size-4" />
                )}
                <Folder className="size-5 text-zinc-400" />
              </div>

              <span className="text-sm font-medium capitalize">
                {collection.name}
              </span>

              {isPending ? (
                <span className="text-xs text-muted-foreground">(...)</span>
              ) : (
                hasRequests && (
                  <span className="text-xs text-muted-foreground">
                    ({requestData.length})
                  </span>
                )
              )}
            </CollapsibleTrigger>

            {/* Actions - UI */}
            <div className="flex items-center gap-1">
              <Hint label="Add New Request">
                <Button
                  variant="ghost"
                  className="p-1.5! h-fit w-fit group cursor-pointer"
                  onClick={handleAddRequest}
                >
                  <FilePlus className="size-4 group-hover:text-foreground text-muted-foreground" />
                </Button>
              </Hint>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-1.5! h-fit w-fit group cursor-pointer"
                  >
                    <EllipsisVertical className="size-4 group-hover:text-foreground text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem onClick={handleAddRequest}>
                    <FilePlus className="mr-2 size-4 text-green-400" />
                    Add Request
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                    <Edit className="mr-2 size-4 text-blue-400" />
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
                    <Trash className="mr-2 size-4 text-red-400" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Requests List */}
          <CollapsibleContent>
            {isPending ? (
              <div className="ml-6 pl-3 text-xs text-muted-foreground py-2 flex items-center gap-2">
                <Loader2 className="size-3 animate-spin" />
                Loading requests...
              </div>
            ) : isError ? (
              <div className="ml-6 pl-3 text-xs text-red-500 py-2">
                Failed to load requests
              </div>
            ) : hasRequests ? (
              <div className="ml-6 border-l pl-3 space-y-1 py-1">
                {requestData.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between py-2 px-2 hover:bg-accent rounded-md cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span
                        className={`text-xs font-bold ${
                          requestColorMap[
                            request.method as keyof typeof requestColorMap
                          ]
                        }`}
                      >
                        {request.method}
                      </span>

                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm  truncate font-medium">
                          {request.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate font-mono">
                          {request.url}
                        </span>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical className="size-4 text-muted-foreground" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-32" align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditRequest(request)}
                        >
                          <Edit className="text-blue-400 mr-2 size-3" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteRequest(request)}
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
          </CollapsibleContent>
        </div>
      </Collapsible>

      <DeleteCollectionModal
        isModalOpen={showDeleteModal}
        setIsModalOpen={setShowDeleteModal}
        collectionId={collection.id}
        collectionName={collection.name}
      />

      <EditCollectionModal
        isModalOpen={showEditModal}
        setIsModalOpen={setShowEditModal}
        collectionId={collection.id}
        initialData={collection}
      />

      {/* Request modals */}
      <SaveRequestToCollectionModal
        workspaceId={collection.workspaceId}
        isModalOpen={showSaveModal}
        setIsModalOpen={setShowSaveModal}
        preSelectedCollectionId={collection.id}
      />

      {selectedRequest && (
        <>
          <EditRequestModal
            isModalOpen={showEditRequestModal}
            setIsModalOpen={setShowEditRequestModal}
            workspaceId={collection.workspaceId}
            requestId={selectedRequest.id}
            initialData={selectedRequest}
          />

          <DeleteRequestModal
            isModalOpen={showDeleteRequestModal}
            setIsModalOpen={setShowDeleteRequestModal}
            requestId={selectedRequest.id}
            requestName={selectedRequest.name}
          />
        </>
      )}
    </>
  );
};
