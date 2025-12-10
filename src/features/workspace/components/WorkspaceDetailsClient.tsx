"use client";

import { useState } from "react";
import { format } from "date-fns";
import { PencilIcon, Trash2Icon } from "lucide-react"; 

import { useGetWorkspaceQuery } from "../queries";
import { DATETIME_FORMAT, TIMESTAMP_FORMAT } from "@/constants/time"; 
import { RenameWorkspaceModal } from "./modals/RenameWorkspaceModal";

import { DeleteWorkspaceModal } from "./modals/DeleteRequestModal"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; 
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkspaceDetailsClientProps {
  workspaceId: string;
}

export const WorkspaceDetailsClient = ({
  workspaceId,
}: WorkspaceDetailsClientProps) => {
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data, isLoading, isError } = useGetWorkspaceQuery(workspaceId);
  const workspace = data?.data;

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="h-40 flex items-center justify-center text-muted-foreground">
          Loading workspace details...
        </CardContent>
      </Card>
    );
  }

  if (isError || !workspace) {
    return (
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="h-40 flex items-center justify-center text-destructive font-semibold">
          Error loading workspace details, or workspace not found.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            {workspace.name}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setOpenRenameModal(true)}
              size="sm"
            >
              <PencilIcon className="mr-2 h-4 w-4" />
              Rename
            </Button>
            <Button
              variant="destructive"   
              onClick={() => setOpenDeleteModal(true)}
              size="sm"
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardHeader>

        <Separator />

        {/* Card Content: Workspace Metadata */}
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4 text-primary">Metadata</h4>

          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            
            {/* ID */}
            <div className="sm:col-span-2 flex justify-between items-center border-b pb-2">
              <dt className="text-sm font-medium text-muted-foreground">
                Workspace ID
              </dt>
              <dd className="font-mono text-xs text-foreground">
                <Badge variant="secondary" className="font-semibold px-2 py-1">
                  {workspace.id}
                </Badge>
              </dd>
            </div>
            
            {/* Created At */}
            <div className="flex justify-between items-center border-b pb-2 sm:border-b-0 sm:pb-0">
              <dt className="text-sm font-medium text-muted-foreground">
                Created At
              </dt>
              <dd className="text-sm text-foreground">
                {format(new Date(workspace.createdAt), DATETIME_FORMAT)}
              </dd>
            </div>

            {/* Last Updated */}
            <div className="flex justify-between items-center border-b pb-2 sm:border-b-0 sm:pb-0">
              <dt className="text-sm font-medium text-muted-foreground">
                Last Updated
              </dt>
              <dd className="text-sm text-foreground">
                {format(new Date(workspace.updatedAt), TIMESTAMP_FORMAT)}
              </dd>
            </div>

            {/* Example of future details */}
            <div className="sm:col-span-2 mt-4 pt-4 border-t">
                 <p className="text-muted-foreground text-sm italic">
                    Additional workspace information (e.g., Owner, Member Count, Settings) would be displayed here.
                 </p>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Rename Modal */}
      <RenameWorkspaceModal
        initialData={{
          id: workspace.id,
          name: workspace.name,
        }}
        isModalOpen={openRenameModal}
        setIsModalOpen={setOpenRenameModal}
      />
      
      <DeleteWorkspaceModal
        workspaceId={workspace.id}
        workspaceName={workspace.name}
        isModalOpen={openDeleteModal}
        setIsModalOpen={setOpenDeleteModal}
      />
    </>
  );
};