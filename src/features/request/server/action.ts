"use server";

import axios, { AxiosError } from "axios";

import { checkWorkspaceAccess } from "@/features/collection/lib/checkWorkspaceAccess";
import { handleServerError } from "@/lib/handleServerError";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { getAuth } from "@/utils/server";
import {
  CreateRequestInput,
  ExecutionDetails,
  PrismaRequest,
  PrismaRequestDetails,
  PrismaRequestRun,
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
 * Executes a Request, stores the run, and returns the result.
 * @param requestId The ID of the request to run
 * @returns The created RequestRun object
 */
export async function runRequest(
  requestId: string
): Promise<ServerActionResponse<PrismaRequestRun | null>> {
  try {
    console.debug("[runRequest]: Starting execution for request", {
      requestId,
    });
    const executedAt = new Date();

    // 1 & 2. Authentication and Access Checks (omitted for brevity, remain the same)
    const authData = await getAuth();
    if (!authData?.user) {
      console.debug("[runRequest]: Unauthorized");
      throw new Error("Unauthorized");
    }
    await verifyRequestAccess(authData.user.id, requestId);

    const requestDetails = await prisma.request.findUnique({
      where: { id: requestId },
      select: {
        method: true,
        url: true,
        body: true,
        headers: { select: { key: true, value: true } },
        queryParams: { select: { key: true, value: true } },
      },
    });

    if (!requestDetails) {
      console.debug("[runRequest]: Request not found during fetch");
      throw new Error("Request not found");
    }

    const executionDetails: ExecutionDetails = {
      url: requestDetails.url,
      method: requestDetails.method,
      body: requestDetails.body,
      headers: requestDetails.headers,
      queryParams: requestDetails.queryParams,
    };

    // 3. Execute the actual HTTP Request
    const runResult = await executeHttpRequest(executionDetails);

    // --- [START] FIX: Explicitly fail the Server Action on External Request Error ---
    if (runResult.error) {
      // Log the failure, but then throw an error to trigger the outer handleServerError
      console.warn(
        "[runRequest]: External request failed, rejecting server action.",
        { error: runResult.error }
      );
      // The message here will be wrapped by handleServerError
      throw new Error(`External Request Failed: ${runResult.error}`);
    }
    // --- [END] FIX: Explicitly fail the Server Action on External Request Error ---

    // 4. Create RequestRun and ResponseHeaders in an INTERACTIVE TRANSACTION (Unchanged from last fix)
    const fullRequestRun = await prisma.$transaction(async (tx) => {
      // 4a. Create the RequestRun record FIRST to get its ID
      const requestRun = await tx.requestRun.create({
        data: {
          requestId: requestId,
          executedAt: executedAt,
          status: runResult.status,
          body: runResult.body,
          durationMs: runResult.durationMs,
          error: runResult.error, // Will be null if we passed the check above
        },
      });

      // 4b. Use the ID from the created RequestRun to create the ResponseHeaders
      if (runResult.responseHeaders.length > 0) {
        await tx.responseHeader.createMany({
          data: runResult.responseHeaders.map((h) => ({
            key: h.key,
            value: h.value,
            runId: requestRun.id,
          })),
        });
      }

      // 4c. Re-fetch the run (including headers) to return the complete object
      const finalRun = await tx.requestRun.findUnique({
        where: { id: requestRun.id },
        include: { headers: true },
      });

      if (!finalRun) {
        throw new Error(
          "Failed to retrieve the final request run after header creation."
        );
      }

      return finalRun;
    }); // End of interactive transaction

    console.debug("[runRequest]: Request run recorded", {
      runId: fullRequestRun.id,
      status: fullRequestRun.status,
    });

    return {
      success: true,
      data: fullRequestRun as PrismaRequestRun,
      message: "Request executed and run recorded.",
    };
  } catch (error) {
    // This catches both authentication errors, Prisma errors, and the new error
    // thrown when the external request fails due to a network error.
    return handleServerError(error, "runRequest");
  }
}
// Helper function to simulate/execute the actual HTTP call
async function executeHttpRequest(details: ExecutionDetails): Promise<{
  status: number | null;
  body: string | null;
  durationMs: number;
  error: string | null;
  responseHeaders: { key: string; value: string }[];
}> {
  const startTime = Date.now();
  let status: number | null = null;
  let body: string | null = null;
  let error: string | null = null;
  let responseHeaders: { key: string; value: string }[] = [];

  try {
    // 1. Construct the URL with query parameters
    const url = new URL(details.url);
    details.queryParams.forEach((p) => url.searchParams.append(p.key, p.value));

    // 2. Format headers for Axios
    const axiosHeaders = details.headers.reduce((acc, h) => {
      acc[h.key] = h.value;
      return acc;
    }, {} as Record<string, string>);

    // 3. Execute the request using Axios
    const response = await axios({
      method: details.method,
      url: url.toString(),
      headers: axiosHeaders,
      data: details.body,
      // Prevents Axios from throwing an error on non-2xx status codes,
      // allowing us to record the actual status.
      validateStatus: () => true,
      // Ensure the response is treated as text/string for 'body' storage
      responseType: "text",
      timeout: 10000, // 10 second timeout
    });

    status = response.status;
    body = response.data;

    // Convert Axios response headers to the Prisma structure
    responseHeaders = Object.keys(response.headers).map((key) => ({
      key,
      value: response.headers[key] as string,
    }));
  } catch (err) {
    // Handle network errors, timeouts, etc.
    const axiosError = err as AxiosError;
    if (axios.isAxiosError(axiosError) && axiosError.message) {
      error = `${axiosError.name}: ${axiosError.message}`;
    } else {
      error = "An unknown network error occurred.";
    }
    console.error("Axios Execution Error:", error);
  } finally {
    const durationMs = Date.now() - startTime;
    return {
      status,
      body,
      durationMs,
      error,
      responseHeaders,
    };
  }
}
