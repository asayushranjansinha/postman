"use server";

import { handleServerError } from "@/lib/handleServerError";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { getAuth } from "@/utils/server";
import { checkWorkspaceAccess } from "../lib/checkWorkspaceAccess";
import {
  CreateCollectionInput,
  PrismaCollectionWithRequests,
  PrismaCollectionWithWorkspaceID,
  RenameCollectionInput,
} from "../types";

// Helper to verify collection access and return workspaceId (bottom-up check)
async function verifyCollectionAccess(
  userId: string,
  collectionId: string
): Promise<string> {
  const collectionCheck = await prisma.collection.findUnique({
    where: { id: collectionId },
    select: { workspaceId: true },
  });

  if (!collectionCheck) {
    throw new Error("Collection Not Found");
  }

  const workspaceId = collectionCheck.workspaceId;

  const allowed = await checkWorkspaceAccess(userId, workspaceId);
  if (!allowed) {
    throw new Error("Forbidden");
  }

  return workspaceId;
}

/**
 * Create Collection
 * @param input Collection data including workspaceId
 * @returns The created collection
 */
export async function createCollection(
  input: CreateCollectionInput
): Promise<ServerActionResponse<PrismaCollectionWithWorkspaceID | null>> {
  try {
    const data = await getAuth();
    if (!data || !data.user) {
      throw new Error("Unauthorized");
    }

    // Direct check since workspaceId is available
    const allowed = await checkWorkspaceAccess(data.user.id, input.workspaceId);
    if (!allowed) {
      throw new Error("Forbidden");
    }

    const collection = await prisma.collection.create({
      data: {
        name: input.name,
        workspaceId: input.workspaceId,
      },
    });

    return {
      success: true,
      data: collection,
      message: "Collection created",
    };
  } catch (error) {
    return handleServerError(error, "createCollection");
  }
}

/**
 * Update Collection (Rename)
 * @param id The ID of the collection to rename
 * @param input New name
 * @returns The updated collection
 */
export async function renameCollection(
  id: string,
  input: RenameCollectionInput
): Promise<ServerActionResponse<PrismaCollectionWithWorkspaceID | null>> {
  try {
    const data = await getAuth();
    if (!data || !data.user) {
      throw new Error("Unauthorized");
    }

    // Bottom-up access check
    await verifyCollectionAccess(data.user.id, id);

    const collection = await prisma.collection.update({
      where: { id },
      data: {
        name: input.name,
      },
    });

    return {
      success: true,
      data: collection,
      message: "Collection updated",
    };
  } catch (error) {
    return handleServerError(error, "renameCollection");
  }
}

/**
 * Delete Collection
 * @param id The ID of the collection to delete
 * @returns The deleted collection
 */
export async function deleteCollection(
  id: string
): Promise<ServerActionResponse<PrismaCollectionWithWorkspaceID | null>> {
  try {
    const data = await getAuth();
    if (!data || !data.user) {
      throw new Error("Unauthorized");
    }

    // Bottom-up access check
    await verifyCollectionAccess(data.user.id, id);

    const deleted = await prisma.collection.delete({ where: { id } });

    return {
      success: true,
      message: "Collection deleted",
      data: deleted,
    };
  } catch (error) {
    return handleServerError(error, "deleteCollection");
  }
}

/**
 * Get Collections by Workspace
 * @param workspaceId The ID of the workspace
 * @returns List of collections
 */
export async function getCollectionsByWorkspace(
  workspaceId: string
): Promise<ServerActionResponse<PrismaCollectionWithWorkspaceID[] | null>> {
  try {

    const collections = await prisma.collection.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "asc" },
    });

    return {
      success: true,
      data: collections,
      message: "Collections retrieved",
    };
  } catch (error) {
    return handleServerError(error, "getCollectionsByWorkspace");
  }
}

/**
 * Get Collection by ID
 * @param collectionId The ID of the collection
 * @returns The collection including its requests
 */
export async function getCollectionById(
  collectionId: string
): Promise<ServerActionResponse<PrismaCollectionWithRequests | null>> {
  try {
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      include: {
        requests: true,
      },
    });

    if (!collection) {
      throw new Error("Collection Not Found");
    }

    return {
      success: true,
      data: collection,
      message: "Success",
    };
  } catch (error) {
    return handleServerError(error, "getCollectionById");
  }
}
