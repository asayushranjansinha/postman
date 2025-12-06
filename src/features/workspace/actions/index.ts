"use server";

import { Member } from "@prisma/client";

import prisma from "@/lib/database";
import { getCurrentUser } from "@/features/authentication/action";

/**
 * Server action to initialize workspace for the first time
 * Default workspace is created for the user
 *
 * @returns An object containing the success status and the workspace
 */
export const initializeWorkspace = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  try {
    // upsert
    const personalWorkspace = await prisma.workspace.upsert({
      where: {
        name_ownerId: {
          name: "Personal Workspace",
          ownerId: user.id,
        },
      },
      create: {
        name: "Personal Workspace",
        description: "Default workspace for personal use",
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: Member.ADMIN,
          },
        },
      },
      update: {},
      include: {
        members: true,
      },
    });
    return { success: true, workspace: personalWorkspace };
  } catch (error) {
    console.error("Error initializing workspace:", error);
    return { success: false, error: "Failed to initialize workspace" };
  }
};

/**
 * Server action to get all workspaces for the user
 *
 * @returns An object containing the success status and the workspaces
 */
export const getWorkspaces = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const personalWorkspaces = await prisma.workspace.findMany({
      where: {
        OR: [{ ownerId: user.id }, { members: { some: { userId: user.id } } }],
      },
      orderBy: { createdAt: "desc" },
    });

    if (!personalWorkspaces || personalWorkspaces.length === 0) {
      return { success: false, error: "Workspaces not found" };
    }

    return { success: true, workspaces: personalWorkspaces };
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return { success: false, error: "Failed to fetch workspaces" };
  }
};

/**
 * Server action to create a new workspace
 *
 * @param name - The name of the workspace
 * @returns An object containing the success status and the workspace
 */
export const createWorkspace = async (name: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const newWorkspace = await prisma.workspace.create({
      data: {
        name,
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: Member.ADMIN,
          },
        },
      },
      include: {
        members: true,
      },
    });
    return { success: true, workspace: newWorkspace };
  } catch (error) {
    console.error("Error creating workspace:", error);
    return { success: false, error: "Failed to create workspace" };
  }
};

/**
 * Server action to get a workspace by id
 
 * @param workspaceId The id of the workspace
 * @returns 
 */
export const getWorkspaceById = async (workspaceId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const workspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        members: true,
      },
    });

    if (!workspace) {
      return { success: false, error: "Workspace not found" };
    }

    // Ensure the user is a member of the workspace
    const isMember = workspace.members.some(
      (member) => member.userId === user.id
    );
    if (!isMember) {
      throw new Error("Forbidden");
    }

    return { success: true, workspace };
  } catch (error) {
    console.error("Error fetching workspace by Id:", error);
    return { success: false, error: "Failed to fetch workspace" };
  }
};
