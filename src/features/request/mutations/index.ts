import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpMethod } from "@prisma/client";

import {
  createRequest,
  deleteRequest,
  runRequest,
  updateRequest,
  updateRequestBody,
  upsertRequestHeaders,
  upsertRequestQueryParams,
} from "../server/action";
import { PrismaRequestRun } from "../types";

/**
 * Hook to create a new request
 * @param input CreateRequestInput
 * @returns data - PrismaRequest
 */
export const useCreateRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRequest,
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });
      }
    },
  });
};

/**
 * Hook to update an existing request
 * @param requestId The ID of the request to be updated
 * @returns data - PrismaRequest
 */
export const useUpdateRequestMutation = (requestId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      workspaceId: string;
      collectionId: string;
      name: string;
      url: string;
      method: HttpMethod;
    }) => {
      // Deconstruct the payload and correctly map it to the server action's arguments
      const { workspaceId, collectionId, ...updateFields } = payload;

      return updateRequest(workspaceId, collectionId, {
        id: requestId, // Use the ID from the hook
        ...updateFields, // name, url, method, etc.
      });
    },
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["requests", data?.data?.id],
        });
      }
    },
  });
};

/**
 * Hook to delete an existing request
 * @param requestId The ID of the request to be deleted
 * @returns data - null (on success)
 */
export const useDeleteRequestMutation = (requestId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    // The mutationFn accepts the requestId (which is already closed over by the hook)
    // The caller of mutate() can pass undefined or an empty object.
    mutationFn: () => deleteRequest(requestId),

    onSuccess(data) {
      if (data.success) {
        // Invalidate the general list of requests to refresh the UI
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });

        // Optionally, remove the specific request from the cache
        queryClient.removeQueries({
          queryKey: ["request", requestId],
        });
      }
    },
  });
};

/**
 * Hook to update the body (content string) of an existing request
 * @param requestId The ID of the request
 * @returns data - null (on success)
 */
export const useUpdateRequestBodyMutation = (requestId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: string) => updateRequestBody(requestId, body),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["requests", requestId],
        });
      }
    },
  });
};

/**
 * Hook to update/replace all headers for a request
 * @param requestId The ID of the request
 * @returns data - null (on success)
 */
export const useUpdateRequestHeadersMutation = (requestId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (headers: { id?: string; key: string; value: string }[]) =>
      upsertRequestHeaders(requestId, headers),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["requests", requestId],
        });
      }
    },
  });
};

/**
 * Hook to update/replace all query parameters for a request
 * @param requestId The ID of the request
 * @returns data - null (on success)
 */
export const useUpdateRequestQueryParamsMutation = (requestId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (queryParams: { id?: string; key: string; value: string }[]) =>
      upsertRequestQueryParams(requestId, queryParams),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["requests", requestId],
        });
      }
    },
  });
};


/**
 * Hook to execute a request, save the run history, and receive the response data.
 * This should be used for actual API execution.
 *
 * @returns data - The created RequestRun object (PrismaRequestRun)
 */
export const useRunRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // The mutationFn accepts the requestId (string)
    mutationFn: (requestId: string) => runRequest(requestId),

    onSuccess(response) {
      if (response.success && response.data) {
        const run: PrismaRequestRun = response.data;
        const requestId = run.requestId;

        // 1. Invalidate the query key for the request's run history.
        // Assuming you have a query to fetch all runs for a specific request.
        queryClient.invalidateQueries({
          queryKey: ["requestRuns", requestId],
        });

        // 2. Potentially invalidate the request details key if you display
        // the last run status or metadata there (though typically run history
        // is separate).
        queryClient.invalidateQueries({
          queryKey: ["requests", requestId],
        });

        console.log(
          `Request executed successfully. Run ID: ${run.id}, Status: ${run.status}`
        );
      } else {
        console.error(
          "Request execution failed (Server Action Error):",
          response.message
        );
      }
    },
    onError(error) {
      console.error("Mutation failed (Client Error):", error);
    },
  });
};