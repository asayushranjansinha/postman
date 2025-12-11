import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createRequest, deleteRequest, updateRequest } from "../server/action";
import { HttpMethod } from "@prisma/client";

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
