"use server";

import { handleServerError } from "@/lib/handleServerError";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";

import { INVITE_EXPIRATION_DAYS } from "@/constants/time";
import { getAuth } from "@/utils/server";
import {
  InviteAcceptInput,
  InviteSentInput,
  PrismaWorkspace,
  WorkspaceCreateInput,
  WorkspaceListResponse,
  WorkspaceRenameInput,
} from "../types";
import { generateInviteToken } from "../utils/invites";

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
      orderBy: {
        createdAt: "desc",
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
        id: workspaceId,
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

/**
 * Server action to send a workspace invite (Generates a public/general link)
 * @param input - Workspace ID and desired role
 * @returns An object containing the success status and the new invite token
 */
export async function sendWorkspaceInvite(
  input: InviteSentInput
): Promise<ServerActionResponse<{ token: string } | null>> {
  try {
    // REMOVED 'email' from destructuring
    const { workspaceId, role } = input;
    const data = await getAuth();
    console.debug("[sendWorkspaceInvite]: Sending invite", {
      workspaceId,
      role,
    });

    if (!data || !data.user) {
      throw new Error("Unauthorized");
    }

    // 1. Authorization Check (No Change)
    const member = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId: workspaceId,
          userId: data.user.id,
        },
      },
      select: { role: true },
    });

    if (!member || (member.role !== "OWNER" && member.role !== "ADMIN")) {
      throw new Error(
        "Permission Denied: Only Owners and Admins can send invites."
      );
    }

    // 2. Pre-Check: (REMOVED: Pre-check for recipient user existence or membership)
    // 3. Cleanup: (REMOVED: Cleanup logic that relied on email)
    // NOTE: If you only want ONE active public invite per workspace, 
    // you would delete all existing public invites here:
    /*
    await prisma.workspaceInvite.deleteMany({
      where: { workspaceId: workspaceId },
    });
    */

    // 4. Create New Invite
    const token = generateInviteToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + INVITE_EXPIRATION_DAYS);

    const invite = await prisma.workspaceInvite.create({
      data: {
        token: token,
        role: role,
        workspaceId: workspaceId,
        inviterId: data.user.id,
        expiresAt: expiresAt,
      },
    });

    return {
      success: true,
      data: { token: invite.token },
      message: "Public workspace invite link created successfully.",
    };
  } catch (error) {
    return handleServerError(error, "sendWorkspaceInvite");
  }
}

/**
 * Server action for an authenticated user to accept a workspace invite (Public Token)
 * @param input - The unique invite token
 * @returns An object containing the success status and the ID of the joined workspace
 */
export async function acceptWorkspaceInvite(input: InviteAcceptInput) {
  try {
    const { token } = input;
    const data = await getAuth();

    if (!data || !data.user) {
      throw new Error("Unauthorized");
    }

    // 1. Find and validate the invite
    const invite = await prisma.workspaceInvite.findUnique({
      where: { token },
      include: {
        workspace: {
          select: { name: true },
        },
      },
    });

    if (!invite) {
      throw new Error("Invalid or already accepted invitation link.");
    }

    if (invite.expiresAt < new Date()) {
      // Delete the expired invite and throw error
      await prisma.workspaceInvite.delete({ where: { token } });
      throw new Error("Invitation link has expired.");
    }

    // REMOVED: Email Match Check (This check is no longer possible)

    // Existing Membership Check (No Change)
    const existingMembership = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId: invite.workspaceId,
          userId: data.user.id,
        },
      },
    });

    if (existingMembership) {
      // Delete the invite and inform the user they are already a member
      await prisma.workspaceInvite.delete({ where: { token } });
      return {
        success: true,
        data: { workspaceId: invite.workspaceId },
        message: `You are already a member of ${invite.workspace.name}.`,
      };
    }

    // 2. Create the new WorkspaceMember
    // NOTE: This now allows ANY authenticated user with the token to join.
    await prisma.workspaceMember.create({
      data: {
        userId: data.user.id,
        workspaceId: invite.workspaceId,
        role: invite.role,
      },
    });

    // 3. Delete the accepted invite to prevent reuse
    await prisma.workspaceInvite.delete({ where: { token } });

    return {
      success: true,
      data: { workspaceId: invite.workspaceId },
      message: `Successfully joined workspace: ${invite.workspace.name}`,
    };
  } catch (error) {
    return handleServerError(error, "acceptWorkspaceInvite");
  }
}
