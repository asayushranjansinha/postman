import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCollection,
  deleteCollection,
  renameCollection,
} from "../server/actions";
import { CreateCollectionInput, RenameCollectionInput } from "../types";

/**
 * Hook to create a new collection
 * @param workspaceId Workspace ID
 * @returns Mutation
 */
export const useCreateCollectionMutation = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCollectionInput) => createCollection(input),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["collections", workspaceId],
        });
      }
    },
  });
};

/**
 * Hook to rename a collection
 * @param collectionId Collection ID
 * @returns Mutation
 */
export const useRenameCollectionMutation = (collectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RenameCollectionInput) =>
      renameCollection(collectionId, input),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["collections", data.data?.workspaceId],
        });

        queryClient.setQueryData(
          ["collection", data.data?.workspaceId, collectionId],
          data.data
        );
      }
    },
  });
};

/**
 * Hook to delete a collection
 * @param collectionId Collection ID
 * @returns Mutation
 */
export const useDeleteCollectionMutation = (collectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCollection(collectionId),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["collections", data.data?.workspaceId],
        });

        queryClient.invalidateQueries({
          queryKey: ["collection", data.data?.workspaceId, collectionId],
        });
      }
    },
  });
};
