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

import { Collection } from "../types";
import { DeleteCollectionModal } from "./DeleteCollectionDialog";
import { EditCollectionModal } from "./EditCollectionModal";

interface Props {
  collection: Collection;
}

// TODO: Replace with actual requests
const MOCK_REQUESTS = [
  {
    id: "1",
    method: "GET",
    name: "Fetch Users",
    url: "/api/users",
  },
  {
    id: "2",
    method: "POST",
    name: "Create User",
    url: "/api/users",
  },
];

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

  const requestData = MOCK_REQUESTS;
  const hasRequests = requestData.length > 0;

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
                {hasRequests ? (
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

              {hasRequests && (
                <span className="text-xs text-muted-foreground">
                  ({requestData.length})
                </span>
              )}
            </CollapsibleTrigger>

            {/* Actions - UI */}
            <div className="flex items-center gap-1">
              <Hint label="Add New">
                <Button
                  variant="ghost"
                  className="p-1.5! h-fit w-fit group cursor-pointer"
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
                  {/* TODO: Add Request Logic */}
                  <DropdownMenuItem>
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
            {hasRequests ? (
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

                      {/* TODO: Implement Request Logic */}
                      <DropdownMenuContent className="w-32">
                        <DropdownMenuItem>
                          <Edit className="text-blue-400 mr-2 size-3" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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
                {/* Design UI */}
              </div>
            )}
          </CollapsibleContent>
        </div>
      </Collapsible>

      <DeleteCollectionModal
        isModalOpen={showDeleteModal}
        setIsModalOpen={setShowDeleteModal}
        collectionId={collection.id}
      />

      <EditCollectionModal
        isModalOpen={showEditModal}
        setIsModalOpen={setShowEditModal}
        collectionId={collection.id}
        initialData={collection}
      />

      {/* TODO: Implement Request Modal */}
    </>
  );
};
