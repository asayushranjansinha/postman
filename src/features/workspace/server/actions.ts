"use server";

import { ServerActionResponse } from "@/types/server";
import { prisma } from "@/lib/prisma";
import { handleServerError } from "@/lib/handleServerError";

import { PrismaWorkspace, WorkspaceCreateInput } from "../types";
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
export async function listWorkspaces() {
  try {
    const data = await getAuth();

    if (!data || !data.user) {
      console.debug("[listWorkspaces] : Unauthorized");
      throw new Error("Unauthorized");
    }
    console.debug("[listWorkspaces]: Listing workspaces");

    const workspaces = await prisma.workspace.findMany({
      where: {
        ownerId: data.user.id,
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
