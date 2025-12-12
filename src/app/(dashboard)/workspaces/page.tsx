import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { listWorkspaces } from "@/features/workspace/server/actions";
import { WorkspaceListClient } from "@/features/workspace/components/WorkspaceListClient";

async function WorkspacesPage() {
  const queryClient = new QueryClient();

  // Prefetch workspace details
  await queryClient.prefetchQuery({
    queryKey: ["workspaces"],
    queryFn: listWorkspaces,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspaceListClient />
    </HydrationBoundary>
  );
}

export default WorkspacesPage;
