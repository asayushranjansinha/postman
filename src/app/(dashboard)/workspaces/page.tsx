import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { CreateWorkspaceButton } from "@/features/workspace/components/CreateWorkspaceButton";
import { listWorkspaces } from "@/features/workspace/server/actions";

async function WorkspacesPage() {
  const queryClient = new QueryClient();

  // Prefetch workspace details
  await queryClient.prefetchQuery({
    queryKey: ["workspaces"],
    queryFn: listWorkspaces,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-svh flex flex-col items-center justify-center space-y-6">
        <h1 className="text-2xl font-bold">Workspaces</h1>
        <div className="flex items-center justify-center">
          <CreateWorkspaceButton />
        </div>
      </div>
    </HydrationBoundary>
  );
}

export default WorkspacesPage;
