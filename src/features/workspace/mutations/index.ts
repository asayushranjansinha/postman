import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  acceptWorkspaceInvite,
  createWorkspace,
  deleteWorkspace,
  renameWorkspace,
  sendWorkspaceInvite,
} from "../server/actions";
import {
  InviteAcceptInput,
  InviteSentInput,
  WorkspaceRenameInput,
} from "../types";

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

/**
 * Hook to send a workspace invite to a user via email.
 * On success, it returns the generated invite token but does not invalidate queries
 * since sending an invite doesn't change the workspace content/list for the sender.
 * @returns ServerActionResponse with the token
 */
export const useSendWorkspaceInviteMutation = () => {
  // We do not invalidate queries here because sending an invite
  // does not immediately change the list of workspaces or members visible to the inviter.
  return useMutation({
    mutationFn: (input: InviteSentInput) => sendWorkspaceInvite(input),
    // onSuccess can be used to display a toast notification with the link/token
    onSuccess(data, variables) {
      if (data.success) {
        console.log(`Invite sent successfully`);
        // Optionally, show a toast notification here
      }
    },
  });
};

/**
 * Hook for an authenticated user to accept a workspace invite.
 * On success, it invalidates "workspaces" and the specific "workspace" query
 * to reflect the new membership status and fetch updated data.
 * @returns ServerActionResponse with the joined workspace ID
 */
export const useAcceptWorkspaceInviteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: InviteAcceptInput) => acceptWorkspaceInvite(input),

    onSuccess(data) {
      if (data.success && data.data) {
        const workspaceId = data.data.workspaceId;

        // Invalidate the list of all workspaces to show the newly joined one
        queryClient.invalidateQueries({
          queryKey: ["workspaces"],
        });

        // Invalidate the specific workspace query to update the member list/access
        queryClient.invalidateQueries({
          queryKey: ["workspace", workspaceId],
        });

        // Optionally, redirect the user to the new workspace page
      }
    },

    onError(error) {
      // Handle acceptance failure (e.g., token expired, email mismatch)
      console.error("Failed to accept invite:", error);
    },
  });
};
