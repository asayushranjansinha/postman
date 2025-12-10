import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspace } from "../server/actions";

/**
 * Hook to create a new workspace
 * @param name Workspace name
 * @returns Workspace
 */
export const useCreateWorkspaceMutation = () => {
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
