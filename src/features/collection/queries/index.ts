import { useQuery } from "@tanstack/react-query";
import {
  getCollectionById,
  getCollectionsByWorkspace,
} from "../server/actions";

/**
 * Hook to fetch all collections inside a workspace
 * @param workspaceId Workspace ID
 * @returns List of collections
 */
export const useCollectionsByWorkspaceQuery = (workspaceId: string) => {
  return useQuery({
    queryKey: ["collections", workspaceId],
    queryFn: () => getCollectionsByWorkspace(workspaceId),
    enabled: !!workspaceId,
  });
};

/**
 * Hook to get a single collection by its ID
 * @param collectionId Collection ID
 * @returns Collection object
 */
export const useGetCollectionQuery = (collectionId: string) => {
  return useQuery({
    queryKey: ["collection", collectionId],
    queryFn: () => getCollectionById(collectionId),
    enabled: !!collectionId,
  });
};
