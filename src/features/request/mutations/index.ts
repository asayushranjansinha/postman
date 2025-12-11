import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpMethod } from "@prisma/client";

import {
  createRequest,
  deleteRequest,
  executeFakeRequest,
  updateRequest,
  updateRequestBody,
  upsertRequestHeaders,
  upsertRequestQueryParams,
} from "../server/action";

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
 * Hook to simulate the execution of a request and receive a fake response.
 * This is used for developing and testing the UI for request/response handling.
 * * @returns data - A simulated RequestRun object (FakeRequestRun)
 */
export const useExecuteFakeRequestMutation = () => {
  // Since this action doesn't modify cached data (it's fake and temporary),
  // we don't necessarily need to invalidate queries like 'requests' or 'request details'.
  // However, if the real 'executeRequest' action saved the run history, you would
  // invalidate a 'requestRuns' query here.

  return useMutation({
    // The mutationFn accepts the requestId (string)
    mutationFn: (requestId: string) => executeFakeRequest(requestId),

    // You handle the success/error state in the calling component to update
    // the UI with the received runData (the fake response).
    onSuccess(response) {
      if (response.success) {
        console.log(
          "Fake Request executed successfully, data received:",
          response.data
        );
      } else {
        console.error(
          "Fake Request execution failed (Server Action Error):",
          response.message
        );
      }
    },
    onError(error) {
      console.error("Mutation failed (Client Error):", error);
    },
  });
};
