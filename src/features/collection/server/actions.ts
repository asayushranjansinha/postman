"use server";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { handleServerError } from "@/lib/handleServerError";
import {
  CreateCollectionInput,
  RenameCollectionInput,
  PrismaCollectionWithRequests,
  PrismaCollectionWithWorkspaceID,
} from "../types";
import { getAuth } from "@/utils/server";
import { checkWorkspaceAccess } from "../lib/checkWorkspaceAccess";

/**
 * Create Collection
 */
export async function createCollection(
  input: CreateCollectionInput
): Promise<ServerActionResponse<PrismaCollectionWithWorkspaceID | null>> {
  try {
    console.debug("[createCollection]: Creating collection");

    const data = await getAuth();
    if (!data || !data.user) {
      console.debug("[createCollection] : Unauthorized");
      throw new Error("Unauthorized");
    }

    const allowed = await checkWorkspaceAccess(data.user.id, input.workspaceId);
    if (!allowed) {
      console.debug("[createCollection] : Forbidden");
      throw new Error("Forbidden");
    }

    const collection = await prisma.collection.create({
      data: {
        name: input.name,
        workspaceId: input.workspaceId,
      },
    });

    console.debug("[createCollection]: Collection created", {
      collectionId: collection.id,
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
 * Update Collection
 */
export async function renameCollection(
  id: string,
  input: RenameCollectionInput
): Promise<ServerActionResponse<PrismaCollectionWithWorkspaceID | null>> {
  try {
    console.debug("[renameCollection]: Renaming collection", { id });

    const data = await getAuth();
    if (!data || !data.user) {
      console.debug("[renameCollection] : Unauthorized");
      throw new Error("Unauthorized");
    }

    const existing = await prisma.collection.findUnique({
      where: { id },
      select: { workspaceId: true },
    });

    if (!existing) {
      console.debug("[renameCollection]: Collection Not Found");
      throw new Error("Collection Not Found");
    }

    const allowed = await checkWorkspaceAccess(
      data.user.id,
      existing.workspaceId
    );
    if (!allowed) {
      console.debug("[renameCollection] : Forbidden");
      throw new Error("Forbidden");
    }

    const collection = await prisma.collection.update({
      where: { id },
      data: {
        name: input.name,
      },
    });

    console.debug("[renameCollection]: Collection updated", { id });

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
 */
export async function deleteCollection(
  id: string
): Promise<ServerActionResponse<PrismaCollectionWithWorkspaceID | null>> {
  try {
    console.debug("[deleteCollection]: Deleting collection", { id });

    const data = await getAuth();
    if (!data || !data.user) {
      console.debug("[deleteCollection] : Unauthorized");
      throw new Error("Unauthorized");
    }

    const existing = await prisma.collection.findUnique({
      where: { id },
      select: { workspaceId: true },
    });

    if (!existing) {
      console.debug("[deleteCollection]: Collection Not Found");
      throw new Error("Collection Not Found");
    }

    const allowed = await checkWorkspaceAccess(
      data.user.id,
      existing.workspaceId
    );
    if (!allowed) {
      console.debug("[deleteCollection] : Forbidden");
      throw new Error("Forbidden");
    }

    const deleted = await prisma.collection.delete({ where: { id } });

    console.debug("[deleteCollection]: Collection deleted", { id });

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
 */
export async function getCollectionsByWorkspace(
  workspaceId: string
): Promise<ServerActionResponse<PrismaCollectionWithWorkspaceID[] | null>> {
  try {
    console.debug("[getCollectionsByWorkspace]: Fetching collections", {
      workspaceId,
    });

    const data = await getAuth();
    if (!data || !data.user) {
      console.debug("[getCollectionsByWorkspace] : Unauthorized");
      throw new Error("Unauthorized");
    }

    const allowed = await checkWorkspaceAccess(data.user.id, workspaceId);
    if (!allowed) {
      console.debug("[getCollectionsByWorkspace] : Forbidden");
      throw new Error("Forbidden");
    }

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
 * @param collectionId Collection ID
 * @returns Collection
 */
export async function getCollectionById(
  collectionId: string
): Promise<ServerActionResponse<PrismaCollectionWithRequests | null>> {
  try {
    console.debug("[getCollectionById]: Fetching collection", { collectionId });

    const data = await getAuth();

    if (!data || !data.user) {
      console.debug("[getCollectionById]: Unauthorized");
      throw new Error("Unauthorized");
    }

    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      include: {
        requests: true,
      },
    });

    if (!collection) {
      console.debug("[getCollectionById]: Collection Not Found");
      throw new Error("Collection Not Found");
    }

    const allowed = await checkWorkspaceAccess(
      data.user.id,
      collection.workspaceId
    );

    if (!allowed) {
      console.debug("[getCollectionById]: Forbidden");
      throw new Error("Forbidden");
    }

    console.debug("[getCollectionById]: Collection retrieved", {
      collectionId,
    });

    return {
      success: true,
      data: collection,
      message: "Success",
    };
  } catch (error) {
    return handleServerError(error, "getCollectionById");
  }
}
