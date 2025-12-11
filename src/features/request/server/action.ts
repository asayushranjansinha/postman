"use server";

import { checkWorkspaceAccess } from "@/features/collection/lib/checkWorkspaceAccess";
import { handleServerError } from "@/lib/handleServerError";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { getAuth } from "@/utils/server";
import {
  CreateRequestInput,
  PrismaRequest,
  PrismaRequestDetails,
  UpdateRequestInput,
} from "../types";

/**
 * Create Request
 * @param input The request data
 * @returns The created request
 */
export async function createRequest(
  input: CreateRequestInput
): Promise<ServerActionResponse<PrismaRequest | null>> {
  try {
    console.debug("[createRequest]: Creating request");

    // Check Authentication
    const data = await getAuth();
    if (!data || !data.user) {
      console.debug("[createRequest]: Unauthorized");
      throw new Error("Unauthorized");
    }

    // Check Workspace Access
    const allowed = await checkWorkspaceAccess(data.user.id, input.workspaceId);
    if (!allowed) {
      console.debug("[createRequest]: Forbidden");
      throw new Error("Forbidden");
    }

    // Create new instance in database
    const request = await prisma.request.create({
      data: {
        name: input.name,
        url: input.url,
        method: input.method,
        collectionId: input.collectionId,
      },
    });

    console.debug("[createRequest]: Request created", {
      requestId: request.id,
    });

    return {
      success: true,
      data: request,
      message: "Request created",
    };
  } catch (error) {
    return handleServerError(error, "createRequest");
  }
}

/**
 * Get Requests By Collection Id
 * @param collectionId The id of the collection
 * @returns The requests in the collection
 */
export async function getRequestsByCollectionId(
  collectionId: string
): Promise<ServerActionResponse<PrismaRequestDetails[] | null>> {
  try {
    console.debug(
      "[getRequestsByCollectionId]: Getting requests by collection id",
      {
        collectionId,
      }
    );

    // Check Authentication
    const data = await getAuth();
    if (!data || !data.user) {
      console.debug("[getRequestsByCollectionId]: Unauthorized");
      throw new Error("Unauthorized");
    }
    // Get collection
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      select: { workspaceId: true },
    });

    if (!collection) {
      throw new Error("Collection not found");
    }

    // Check Workspace Access
    const allowed = await checkWorkspaceAccess(
      data.user.id,
      collection.workspaceId
    );
    if (!allowed) {
      console.debug("[getRequestsByCollectionId]: Forbidden");
      throw new Error("Forbidden");
    }

    // Get requests by collection id
    const requests = await prisma.request.findMany({
      where: {
        collectionId,
      },
      include: {
        headers: true,
        queryParams: true,
      },
    });

    console.debug("[getRequestsByCollectionId]: Requests retrieved", {
      collectionId,
      requestsCount: requests.length,
    });

    return {
      success: true,
      data: requests,
      message: "Requests retrieved",
    };
  } catch (error) {
    return handleServerError(error, "getRequestsByCollectionId");
  }
}

/**
 * Update Request
 * @param workspaceId The ID of the workspace (for access check)
 * @param collectionId The ID of the collection (not strictly needed for update, but kept for context)
 * @param input The request data including the request ID
 * @returns The updated request
 */
export async function updateRequest(
  workspaceId: string,
  collectionId: string,
  input: UpdateRequestInput
): Promise<ServerActionResponse<PrismaRequest | null>> {
  try {
    console.debug("[updateRequest]: Updating request", {
      requestId: input.id,
      collectionId,
    });

    // 1. Check Authentication
    const data = await getAuth();
    if (!data || !data.user) {
      console.debug("[updateRequest]: Unauthorized");
      throw new Error("Unauthorized");
    }

    // 2. Check Workspace Access 
    const allowed = await checkWorkspaceAccess(data.user.id, workspaceId);
    if (!allowed) {
      console.debug("[updateRequest]: Forbidden");
      throw new Error("Forbidden");
    }

    // 3. Update the existing request in the database
    const updatedRequest = await prisma.request.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        url: input.url,
        method: input.method,
      },
    });

    console.debug("[updateRequest]: Request updated", {
      requestId: updatedRequest.id,
    });

    return {
      success: true,
      data: updatedRequest,
      message: "Request updated",
    };
  } catch (error) {
    return handleServerError(error, "updateRequest");
  }
}

/**
 * Delete Request
 * @param requestId The ID of the request to delete
 * @returns ServerActionResponse indicating success
 */
export async function deleteRequest(
  requestId: string
): Promise<ServerActionResponse<null>> {
  try {
    console.debug("[deleteRequest]: Attempting to delete request", {
      requestId,
    });

    // 1. Check Authentication
    const data = await getAuth();
    if (!data || !data.user) {
      console.debug("[deleteRequest]: Unauthorized");
      throw new Error("Unauthorized");
    }

    // 2. Fetch Request/Collection/Workspace IDs for Access Check
    const requestDetails = await prisma.request.findUnique({
      where: { id: requestId },
      select: { 
        collection: { 
          select: { 
            workspaceId: true 
          } 
        } 
      },
    });

    if (!requestDetails) {
      // If the request is not found, we can treat it as a success for idempotency, 
      // or throw an error if strict existence is required. Throwing is safer for user feedback.
      throw new Error("Request not found");
    }
    
    const workspaceId = requestDetails.collection.workspaceId;

    // 3. Check Workspace Access
    const allowed = await checkWorkspaceAccess(data.user.id, workspaceId);
    if (!allowed) {
      console.debug("[deleteRequest]: Forbidden");
      throw new Error("Forbidden");
    }

    // 4. Delete the request
    // Prisma handles cascading deletion for related entities (like headers/params) 
    // if your schema is configured with `onDelete: Cascade`.
    await prisma.request.delete({
      where: {
        id: requestId,
      },
    });

    console.debug("[deleteRequest]: Request deleted successfully", {
      requestId,
    });

    return {
      success: true,
      data: null,
      message: "Request deleted",
    };
  } catch (error) {
    return handleServerError(error, "deleteRequest");
  }
}

