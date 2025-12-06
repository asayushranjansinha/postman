import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createCollection,
  deleteCollectionById,
  getCollections,
  updateCollection,
} from "../actions";

/**
 * Hook to get all collections for a workspace
 *
 * @param workspaceId The id of the workspace
 * @returns Collections
 */
export const useCollections = (workspaceId: string) => {
  return useQuery({
    queryKey: ["collections", workspaceId],
    queryFn: () => getCollections(workspaceId),
  });
};

/**
 * Hook to create a new collection in a workspace
 * @returns Collection
 */
export const useCreateCollection = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      workspaceId,
      name,
    }: {
      workspaceId: string;
      name: string;
    }) => createCollection(workspaceId, name),
    onSuccess(_data, variables) {
      client.invalidateQueries({
        queryKey: ["collections", variables.workspaceId],
      });
    },
  });
};

/**
 * Hook to delete a collection by id
 * @returns Collection
 */
export const useDeleteCollection = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: string) => deleteCollectionById(collectionId),
    onSuccess(data) {
      client.invalidateQueries({
        queryKey: ["collections", data.collection?.workspaceId],
      });
    },
  });
};

/**
 * Hook to update a collection by id
 * @returns Collection
 */
export const useUpdateCollection = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      collectionId,
      name,
    }: {
      collectionId: string;
      name: string;
    }) => updateCollection(collectionId, name),
    onSuccess(data) {
      client.invalidateQueries({
        queryKey: ["collections", data.collection?.workspaceId],
      });
    },
  });
};
