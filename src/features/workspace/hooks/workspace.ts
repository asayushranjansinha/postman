import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  initializeWorkspace,
} from "../actions";

/**
 * Hook to get all workspaces user is a member of
 * @returns Workspaces
 */
export const useWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });
};

/**
 * Hook to get a workspace by id
 * @param workspaceId Workspace id
 * @returns Workspace
 */
export const useWorkspaceById = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspaceById(workspaceId),
  });
};

/**
 * Hook to create a new workspace
 * @param name Workspace name
 * @returns Workspace
 */
export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkspace,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });
};

/**
 * Hook to initialize workspace for the first time
 * @returns Workspace
 */
export const useInitializeWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: initializeWorkspace,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });
};
