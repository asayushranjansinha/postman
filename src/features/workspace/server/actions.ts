"use server";

import { ServerActionResponse } from "@/types/server";
import { prisma } from "@/lib/prisma";
import { handleServerError } from "@/lib/handleServerError";

import {
  PrismaWorkspace,
  WorkspaceCreateInput,
  WorkspaceListResponse,
  WorkspaceRenameInput,
} from "../types";
import { getAuth } from "@/utils/server";

/**
 * Server action to create a new workspace
 * @param name - The name of the workspace
 * @returns An object containing the success status and the workspace
 */
export async function createWorkspace(
  input: WorkspaceCreateInput
): Promise<ServerActionResponse<PrismaWorkspace | null>> {
  try {
    const data = await getAuth();

    if (!data || !data.user) {
      console.debug("[createWorkspace]: Unauthorized");
      throw new Error("Unauthorized");
    }
    console.debug("[createWorkspace]: Creating workspace");

    const workspace = await prisma.workspace.create({
      data: {
        name: input.name,
        ownerId: data.user.id,
        members: {
          create: {
            userId: data.user.id,
            role: "OWNER",
          },
        },
      },
    });

    console.debug("[createWorkspace]: Workspace Created", {
      workspaceId: workspace.id,
    });

    return {
      success: true,
      data: workspace,
      message: "Workspace Created",
    };
  } catch (error) {
    return handleServerError(error, "createWorkspace");
  }
}

/**
 * Server action to list all workspaces
 * @returns An object containing the success status and the workspaces
 */
export async function listWorkspaces(): Promise<
  ServerActionResponse<WorkspaceListResponse[] | null>
> {
  try {
    const data = await getAuth();

    if (!data || !data.user) {
      console.debug("[listWorkspaces] : Unauthorized");
      throw new Error("Unauthorized");
    }
    console.debug("[listWorkspaces]: Listing workspaces");

    const workspaces = await prisma.workspace.findMany({
      where: {
        OR: [
          { ownerId: data.user.id },
          { members: { some: { userId: data.user.id } } },
        ],
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    console.debug("[listWorkspaces]: Workspaces Listed", {
      workspaceCount: workspaces.length,
    });

    return {
      success: true,
      data: workspaces,
      message: "Success",
    };
  } catch (error) {
    return handleServerError(error, "listWorkspaces");
  }
}

/**
 * Server action to rename a workspace
 * @param workspaceId Workspace ID
 * @param input Workspace name
 * @returns An object containing the success status and the workspace
 */
export async function renameWorkspace(
  workspaceId: string,
  input: WorkspaceRenameInput
) {
  try {
    const data = await getAuth();

    if (!data || !data.user) {
      console.debug("[renameWorkspace] : Unauthorized");
      throw new Error("Unauthorized");
    }
    console.debug("[renameWorkspace]: Updating workspace");

    const workspace = await prisma.workspace.update({
      where: {
        id: workspaceId,
        ownerId: data.user.id,
      },
      data: {
        name: input.name,
      },
    });

    if (!workspace) {
      console.debug("[renameWorkspace]: Workspace Not Found");
      throw new Error("Workspace Not Found");
    }

    console.debug("[renameWorkspace]: Workspace renamed", {
      workspaceId: workspace.id,
    });

    return {
      success: true,
      data: workspace,
      message: "Workspace renamed",
    };
  } catch (error) {
    return handleServerError(error, "renameWorkspace");
  }
}

/**
 * Server action to get a workspace
 * @param workspaceId Workspace ID
 * @returns An object containing the success status and the workspace
 */
export async function getWorkspace(workspaceId: string) {
  try {
    const data = await getAuth();

    if (!data || !data.user) {
      console.debug("[getWorkspace] : Unauthorized");
      throw new Error("Unauthorized");
    }
    console.debug("[getWorkspace]: Getting workspace");

    const workspace = await prisma.workspace.findUnique({
       where: {
        id:workspaceId,
        OR: [
          { ownerId: data.user.id },
          { members: { some: { userId: data.user.id } } },
        ],
      },
      include: {
        collections: {
          include: {
            requests: true,
          },
        },
      },
    });

    if (!workspace) {
      console.debug("[getWorkspace]: Workspace Not Found");
      throw new Error("Workspace Not Found");
    }

    console.debug("[getWorkspace]: Workspace retrieved", {
      workspaceId: workspace.id,
    });

    return {
      success: true,
      data: workspace,
      message: "Success",
    };
  } catch (error) {
    return handleServerError(error, "getWorkspace");
  }
}

/**
 * Server action to delete a workspace
 * @param workspaceId Workspace ID
 * @returns An object containing the success status and the workspace
 */
export async function deleteWorkspace(workspaceId: string) {
  try {
    const data = await getAuth();

    if (!data || !data.user) {
      console.debug("[deleteWorkspace] : Unauthorized");
      throw new Error("Unauthorized");
    }
    console.debug("[deleteWorkspace]: Deleting workspace");

    const workspace = await prisma.workspace.delete({
      where: {
        id: workspaceId,
        ownerId: data.user.id,
      },
    });

    if (!workspace) {
      console.debug("[deleteWorkspace]: Workspace Not Found");
      throw new Error("Workspace Not Found");
    }

    console.debug("[deleteWorkspace]: Workspace deleted", {
      workspaceId: workspace.id,
    });

    return {
      success: true,
      data: workspace,
      message: "Workspace deleted",
    };
  } catch (error) {
    return handleServerError(error, "deleteWorkspace");
  }
}
