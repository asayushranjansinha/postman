import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpMethod } from "@prisma/client";

import {
  createRequest,
  deleteRequest,
  runRequest,
  saveUnsavedRequest,
  updateRequest,
  updateRequestBody,
  upsertRequestHeaders,
  upsertRequestQueryParams,
} from "../server/action";
import {
  PrismaRequestDetails,
  PrismaRequestRun,
  SaveUnsavedRequestInput,
  UpdateRequestInput,
} from "../types";

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
export const useUpdateRequestMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: UpdateRequestInput) => {
      // The updated server action only takes the input object.
      // We construct the final input object here, including the closed-over requestId.
      return updateRequest(payload);
    },
    
    onSuccess(data) {
      if (data.success) {
        // Invalidate the general list of requests
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });
        
        // Invalidate the specific request details
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

/**
 * Hook to save a new request that currently exists only in the client store
 * into a permanent collection in the database.
 * * @returns data - The newly created PrismaRequestDetails with its permanent ID
 */
export const useSaveUnsavedRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SaveUnsavedRequestInput) => {
      // The payload structure matches the required input for saveUnsavedRequest
      return saveUnsavedRequest(payload);
    },

    onSuccess(response) {
      if (response.success && response.data) {
        const newRequest: PrismaRequestDetails = response.data;

        // 1. Invalidate the general list of requests to show the new item in the sidebar/collection view.
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });

        // 2. Invalidate queries related to the collection, as its contents have changed.
        queryClient.invalidateQueries({
          queryKey: ["requestsByCollection", newRequest.collectionId],
        });
      } else {
        console.error(
          "Save Unsaved Request failed (Server Action Error):",
          response.message
        );
      }
    },
    onError(error) {
      console.error("Mutation failed (Client Error):", error);
    },
  });
};
