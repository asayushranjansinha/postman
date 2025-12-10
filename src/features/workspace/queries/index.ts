import { useQuery } from "@tanstack/react-query";
import { getWorkspace, listWorkspaces } from "../server/actions";


/**
 * Hook to list all workspaces user is a member of
 * @returns List of workspaces user is a member of
 */
export const useListWorkspacesQuery = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: listWorkspaces,
  });
};


/**
 * Hook to get a specific workspace
 * @param workspaceId Workspace ID
 * @returns Workspace object
 */
export const useGetWorkspaceQuery = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspaces", workspaceId],
    queryFn: () => getWorkspace(workspaceId),
  });
};