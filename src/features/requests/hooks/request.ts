import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getAllRequestsInCollection,
  saveRequest,
  addRequestToCollection,
  updateRequest,
  deleteRequest,
} from "../actions";
import { RequestModel } from "../types";
import { RequestMethod } from "@prisma/client";

/**
 * Hook to get all requests in a collection
 * @param collectionId The id of the collection
 * @returns An object with a success, error and requests
 */
export const useGetAllRequestsInCollectionQuery = (collectionId: string) => {
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: () => getAllRequestsInCollection(collectionId),
  });
};

/**
 * Hook to save a request
 * @returns An object with a success, error and request
 */
export const useSaveRequestMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (request: RequestModel) => saveRequest(request),
    onSuccess(data) {
      if (!data.success || !data.request) return;
      client.invalidateQueries({
        queryKey: ["requests", data.request.collectionId],
      });
    },
  });
};

/**
 * Hook to add a request to a collection
 * @returns An object with a success, error and request
 */
export const useAddRequestToCollectionMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      collectionId,
      request,
    }: {
      collectionId: string;
      request: Omit<RequestModel, "id">;
    }) => addRequestToCollection(collectionId, request),
    onSuccess(data) {
      if (!data.success || !data.request) return;
      client.invalidateQueries({
        queryKey: ["requests", data.request.collectionId],
      });
    },
  });
};

/**
 * Hook to update a request
 * @returns An object with a success, error and request
 */
export function useUpdateRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      data,
    }: {
      requestId: string;
      data: { name: string; url: string; method: RequestMethod };
    }) => updateRequest(requestId, data),
    onSuccess(data) {
      if (!data.success || !data.request) return;
      queryClient.invalidateQueries({
        queryKey: ["requests", data.request.collectionId],
      });
    },
  });
}

/**
 * Hook to delete a request
 * @returns An object with a success, error and request
 */
export function useDeleteRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => deleteRequest(requestId),
    onSuccess: (data) => {
      if (!data.success || !data.collectionId) return;
      // Invalidate the requests query
      queryClient.invalidateQueries({
        queryKey: ["requests", data.collectionId],
      });
    },
  });
}
