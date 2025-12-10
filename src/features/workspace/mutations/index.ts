import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWorkspace,
  deleteWorkspace,
  renameWorkspace,
} from "../server/actions";
import { WorkspaceRenameInput } from "../types";

/**
 * Hook to create a new workspace
 * @param name Workspace name
 * @returns Workspace
 */
export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkspace,
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["workspaces"],
        });
      }
    },
  });
};

/**
 * Hook to rename an existing workspace
 * @param workspaceId Workspace ID
 * @param name Workspace name
 * @returns Workspace
 */
export const useRenameWorkspaceMutation = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: WorkspaceRenameInput) =>
      renameWorkspace(workspaceId, input),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["workspaces"],
        });
        queryClient.setQueryData(["workspace", workspaceId], data.data);
      }
    },
  });
};


/**
 * Hook to delete an existing workspace
 * @param workspaceId Workspace ID
 * @returns Workspace
 */
export const useDeleteWorkspaceMutation = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteWorkspace(workspaceId),
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["workspaces"],
        });
        queryClient.invalidateQueries({
          queryKey: ["workspace", workspaceId],
        });
      }
    },
  });
};
