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
  SaveUnsavedRequestInput,
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
    throw new Error("Request not found");
  }

  const workspaceId = accessCheck.collection.workspaceId;

  const allowed = await checkWorkspaceAccess(userId, workspaceId);

  if (!allowed) {
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
    // Check Authentication
    const data = await getAuth();
    if (!data || !data.user) {
      throw new Error("Unauthorized");
    }

    // Check Workspace Access
    const allowed = await checkWorkspaceAccess(data.user.id, input.workspaceId);
    if (!allowed) {
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
    // Check Authentication
    const data = await getAuth();
    if (!data || !data.user) {
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
      orderBy: {
        createdAt: "desc", // Sort by creation time in descending order
      },
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
 * @param input The request data including the request ID
 * @returns The updated request
 */
export async function updateRequest(
  input: UpdateRequestInput
): Promise<ServerActionResponse<PrismaRequest | null>> {
  try {
    // 1. Check Authentication
    const data = await getAuth();
    if (!data || !data.user) {
      throw new Error("Unauthorized");
    }

    // 2. Check Request Access
    await verifyRequestAccess(data.user.id, input.id);

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
    // 1. Check Authentication
    const data = await getAuth();
    if (!data || !data.user) {
      throw new Error("Unauthorized");
    }

    // 2. Access check
    await verifyRequestAccess(data.user.id, requestId);

    // 3. Delete the request
    await prisma.request.delete({
      where: {
        id: requestId,
      },
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
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        headers: true,
        queryParams: true,
      },
    });

    if (!request) {
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
    const data = await getAuth();
    if (!data?.user) {
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
    // 1. Check auth
    const data = await getAuth();
    if (!data?.user) {
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
    // 1. Authenticate
    const data = await getAuth();
    if (!data?.user) {
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
    const executedAt = new Date();

    // 1 & 2. Authentication and Access Checks (omitted for brevity, remain the same)
    const authData = await getAuth();
    if (!authData?.user) {
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

    // FIX: Explicitly fail the Server Action on External Request Error
    if (runResult.error) {
      // The error is logged inside handleServerError (outer catch block)
      throw new Error(runResult.error);
    }

    // 4. Create RequestRun and ResponseHeaders in an INTERACTIVE TRANSACTION
    const fullRequestRun = await prisma.$transaction(async (tx) => {
      // 4a. Create the RequestRun record FIRST to get its ID
      const requestRun = await tx.requestRun.create({
        data: {
          requestId: requestId,
          executedAt: executedAt,
          status: runResult.status,
          body: runResult.body,
          durationMs: runResult.durationMs,
          error: runResult.error, // This is null due to the check above
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

    return {
      success: true,
      data: fullRequestRun as PrismaRequestRun,
      message: "Request executed and run recorded.",
    };
  } catch (error) {
    // This catches authentication errors, Prisma errors, and network errors (via the throw)
    return handleServerError(error, "runRequest");
  }
}
// Helper function to execute the actual HTTP call
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
      // Prevents Axios from throwing an error on non-2xx status codes
      validateStatus: () => true,
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

/**
 * Save Unsaved Request
 * Creates a new request entry in the database using the temporary data from the client store.
 * This is used when an unsaved request (collectionId="") is saved into a collection for the first time.
 * * @param input The request data including name, url, method, body, headers, queryParams, and target collectionId.
 * @returns The newly created request (PrismaRequestDetails) including its new database ID.
 */
export async function saveUnsavedRequest(
  input: SaveUnsavedRequestInput
): Promise<ServerActionResponse<PrismaRequestDetails | null>> {
  try {
    // 1. Check Authentication
    const data = await getAuth();
    if (!data || !data.user) {
      throw new Error("Unauthorized");
    }

    // 2. Check Workspace Access
    const allowed = await checkWorkspaceAccess(data.user.id, input.workspaceId);
    if (!allowed) {
      throw new Error("Forbidden");
    }

    // 3. Create Request and associated details in a Transaction
    const newRequest = await prisma.$transaction(async (tx) => {
      // 3a. Create the Request record
      const request = await tx.request.create({
        data: {
          name: input.name,
          url: input.url,
          method: input.method,
          body: input.body,
          collectionId: input.collectionId,
        },
      });

      const newRequestId = request.id;

      // 3b. Create Headers
      if (input.headers.length > 0) {
        await tx.requestHeader.createMany({
          data: input.headers.map((h) => ({
            key: h.key,
            value: h.value,
            requestId: newRequestId,
          })),
        });
      }

      // 3c. Create Query Parameters
      if (input.queryParams.length > 0) {
        await tx.requestQueryParam.createMany({
          data: input.queryParams.map((p) => ({
            key: p.key,
            value: p.value,
            requestId: newRequestId,
          })),
        });
      }

      // 3d. Re-fetch the complete details to return to the client
      const finalRequest = await tx.request.findUnique({
        where: { id: newRequestId },
        include: {
          headers: true,
          queryParams: true,
        },
      });

      if (!finalRequest) {
        throw new Error("Failed to retrieve the final request after creation.");
      }

      return finalRequest;
    }); // End of transaction

    return {
      success: true,
      data: newRequest as PrismaRequestDetails,
      message: "New request saved to collection.",
    };
  } catch (error) {
    return handleServerError(error, "saveUnsavedRequest");
  }
}
