"use server";

import { checkWorkspaceAccess } from "@/features/collection/lib/checkWorkspaceAccess";
import { handleServerError } from "@/lib/handleServerError";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { getAuth } from "@/utils/server";
import {
  CreateRequestInput,
  FakeRequestRun,
  PrismaRequest,
  PrismaRequestDetails,
  UpdateRequestInput,
} from "../types";

/**
 * Verifies if the authenticated user has access to the request's workspace
 * using a single, bottom-up database query for optimization.
 *
 * @param userId The ID of the authenticated user.
 * @param requestId The ID of the request being accessed.
 * @throws Error if the user is unauthorized, the request is not found, or access is forbidden.
 * @returns The workspaceId if access is granted.
 */
async function verifyRequestAccess(
  userId: string,
  requestId: string
): Promise<string> {
  const accessCheck = await prisma.request.findUnique({
    where: { id: requestId },
    select: {
      collection: {
        select: {
          workspaceId: true,
        },
      },
    },
  });

  if (!accessCheck) {
    console.debug("[verifyRequestAccess]: Request not found", { requestId });
    throw new Error("Request not found");
  }

  const workspaceId = accessCheck.collection.workspaceId;

  const allowed = await checkWorkspaceAccess(userId, workspaceId);

  if (!allowed) {
    console.debug("[verifyRequestAccess]: Forbidden", {
      userId,
      workspaceId,
      requestId,
    });
    throw new Error("Forbidden");
  }

  return workspaceId;
}

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

    // 2. Optimized access check
    await verifyRequestAccess(data.user.id, requestId);
    // Note: verifyRequestAccess handles logging for not found/forbidden.

    // 3. Delete the request
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

/**
 * Get Request Details (Public)
 * @param requestId The ID of the request
 * @returns The request details including headers and query params (no body)
 */
export async function getRequestDetailsById(
  requestId: string
): Promise<ServerActionResponse<PrismaRequestDetails | null>> {
  try {
    console.debug("[getRequestDetailsById]: Fetching", { requestId });

    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        headers: true,
        queryParams: true,
      },
    });

    if (!request) {
      console.debug("[getRequestDetailsById]: Request not found");
      throw new Error("Request not found");
    }

    return {
      success: true,
      data: request,
      message: "Request details retrieved",
    };
  } catch (error) {
    return handleServerError(error, "getRequestDetailsById");
  }
}

/**
 * Update Request Body
 * @param requestId The ID of the request whose body to update
 * @param body The new body content (string)
 * @returns ServerActionResponse indicating success
 */
export async function updateRequestBody(
  requestId: string,
  body: string
): Promise<ServerActionResponse<null>> {
  try {
    console.debug("[updateRequestBody]: Updating body", { requestId });

    const data = await getAuth();
    if (!data?.user) {
      console.debug("[updateRequestBody]: Unauthorized");
      throw new Error("Unauthorized");
    }

    // Optimized access check
    await verifyRequestAccess(data.user.id, requestId);

    await prisma.request.update({
      where: { id: requestId },
      data: { body },
    });

    return { success: true, data: null, message: "Body updated" };
  } catch (error) {
    return handleServerError(error, "updateRequestBody");
  }
}

/**
 * Update/Insert Request Headers
 * Deletes all existing headers for the request and inserts the provided list.
 * @param requestId The ID of the request
 * @param headers An array of header key/value pairs (id is optional)
 * @returns ServerActionResponse indicating success
 */
export async function upsertRequestHeaders(
  requestId: string,
  headers: { id?: string; key: string; value: string }[]
): Promise<ServerActionResponse<null>> {
  try {
    console.debug("[upsertRequestHeaders]: Updating headers", { requestId });

    // 1. Check auth
    const data = await getAuth();
    if (!data?.user) {
      console.debug("[upsertRequestHeaders]: Unauthorized");
      throw new Error("Unauthorized");
    }

    // 2. Optimized access check
    await verifyRequestAccess(data.user.id, requestId);

    // 3. Delete existing headers
    await prisma.requestHeader.deleteMany({ where: { requestId } });

    // 4. Insert new headers
    if (headers.length > 0) {
      await prisma.requestHeader.createMany({
        data: headers.map((h) => ({
          key: h.key,
          value: h.value,
          requestId,
        })),
      });
    }

    return { success: true, data: null, message: "Headers updated" };
  } catch (error) {
    return handleServerError(error, "upsertRequestHeaders");
  }
}

/**
 * Update/Insert Request Query Parameters
 * Deletes all existing query parameters for the request and inserts the provided list.
 * @param requestId The ID of the request
 * @param queryParams An array of query parameter key/value pairs (id is optional)
 * @returns ServerActionResponse indicating success
 */
export async function upsertRequestQueryParams(
  requestId: string,
  queryParams: { id?: string; key: string; value: string }[]
): Promise<ServerActionResponse<null>> {
  try {
    console.debug("[upsertRequestQueryParams]: Updating query params", {
      requestId,
    });

    // 1. Authenticate
    const data = await getAuth();
    if (!data?.user) {
      console.debug("[upsertRequestQueryParams]: Unauthorized");
      throw new Error("Unauthorized");
    }

    // 2. Optimized access check
    await verifyRequestAccess(data.user.id, requestId);

    // 3. Clear existing query params
    await prisma.requestQueryParam.deleteMany({ where: { requestId } });

    // 4. Insert new query params if any
    if (queryParams.length > 0) {
      await prisma.requestQueryParam.createMany({
        data: queryParams.map((p) => ({
          key: p.key,
          value: p.value,
          requestId,
        })),
      });
    }

    return { success: true, data: null, message: "Query params updated" };
  } catch (error) {
    return handleServerError(error, "upsertRequestQueryParams");
  }
}

/**
 * Simulates executing a request and returns a fake success or failure response.
 *
 * @param requestId The ID of the request to simulate executing.
 * @returns ServerActionResponse containing a FakeRequestRun object.
 */
export async function executeFakeRequest(
  requestId: string
): Promise<ServerActionResponse<FakeRequestRun | null>> {
  try {
    console.debug("[executeFakeRequest]: Simulating request execution", {
      requestId,
    });

    // Check Authentication
    const data = await getAuth();
    if (!data?.user) {
      console.debug("[executeFakeRequest]: Unauthorized");
      throw new Error("Unauthorized");
    }

    // Access Check (Optimistic Bottom-Up)
    // Ensures the user has permission to 'execute' this request
    await verifyRequestAccess(data.user.id, requestId);

    // 50/50 chance of success or failure
    const isSuccess = Math.random() < 0.5;

    let runData: FakeRequestRun;

    if (isSuccess) {
      // SUCCESS RESPONSE (HTTP 200 OK)
      runData = {
        id: `fake_run_${Date.now()}`,
        requestId: requestId,
        executedAt: new Date(),
        status: 200,
        body: '{"status": "success", "message": "Data retrieved successfully.", "count": 10}',
        durationMs: Math.floor(Math.random() * 500) + 100, // 100ms - 600ms
        error: null,
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "X-RateLimit-Remaining", value: "99" },
        ],
      };
      console.debug("[executeFakeRequest]: Simulated success", {
        status: runData.status,
      });
    } else {
      // FAILURE RESPONSE (Simulating a Network Error/Timeout)
      runData = {
        id: `fake_run_${Date.now()}`,
        requestId: requestId,
        executedAt: new Date(),
        status: null, // No HTTP status received
        body: null,
        durationMs: 3000, // Long duration simulating timeout
        error:
          "ECONNREFUSED: Connection refused at 127.0.0.1:8080. Check host address and port.",
        headers: [], // No response headers received
      };
      console.debug("[executeFakeRequest]: Simulated failure", {
        error: runData.error,
      });
    }

    return {
      success: true,
      data: runData,
      message: `Request simulation complete. Status: ${
        runData.status || "Network Error"
      }`,
    };
  } catch (error) {
    return handleServerError(error, "executeFakeRequest");
  }
}
