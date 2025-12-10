"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import React from "react";
import { useListWorkspacesQuery } from "../queries";
import { PrismaWorkspace } from "../types";
import { format } from "date-fns";
import { DATETIME_FORMAT, TIMESTAMP_FORMAT } from "@/constants/time";
import { useRouter } from "next/navigation";

/**
 * Renders the list of workspaces as a comprehensive data table.
 */
export const WorkspaceListClient = () => {
  const router = useRouter();
  const { data } = useListWorkspacesQuery();
  const workspaces: PrismaWorkspace[] = data?.data || [];

  if (!workspaces || workspaces.length === 0) {
    return <EmptyWorkspaceList />;
  }

  function navigateToWorkspace(workspaceId: string) {
    router.push(`/workspace/${workspaceId}`);
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Workspaces</h2>
          <p className="text-muted-foreground">
            A list of all your workspaces and their details.
          </p>
        </div>
        <Button>+ Create New Workspace</Button>
      </div>
      <Separator />

      {/* Table Section */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Workspace Name</TableHead>
                <TableHead className="hidden sm:table-cell">ID</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created At
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  Last Updated
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workspaces.map((workspace) => (
                <TableRow key={workspace.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {workspace.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">
                    {workspace.id}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden md:table-cell">
                    {format(new Date(workspace.createdAt), DATETIME_FORMAT)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden lg:table-cell">
                    {format(new Date(workspace.updatedAt), TIMESTAMP_FORMAT)}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigateToWorkspace(workspace.id)}>
                      View
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Reusing the Empty State component
const EmptyWorkspaceList = () => {
  return (
    <div className="flex items-center justify-center h-40">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>No Workspaces</CardTitle>
          <CardDescription>
            It looks like you haven't created any workspaces yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Click the "Create New" button to get started.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
