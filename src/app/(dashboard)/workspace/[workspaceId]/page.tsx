import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getCollectionsByWorkspace } from "@/features/collection/server/actions";
import { WorkspaceDetailsClient } from "@/features/workspace/components/WorkspaceDetailsClient";
import { getWorkspace } from "@/features/workspace/server/actions";
import { WorkspaceSidebar } from "@/features/workspace/components/WorkspaceSidebar";

type PageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function WorkspaceDetailsPage({ params }: PageProps) {
  const { workspaceId } = await params;

  const queryClient = new QueryClient();

  // Prefetch the workspace data
  await queryClient.prefetchQuery({
    queryKey: ["workspaces", workspaceId],
    queryFn: () => getWorkspace(workspaceId),
  });

  // Prefetch collections in this workspace
  await queryClient.fetchQuery({
    queryKey: ["collections", workspaceId],
    queryFn: () => getCollectionsByWorkspace(workspaceId),
  });

  return (
    // HydrationBoundary
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={65} minSize={40}>
          <div className="h-svh w-full overflow-y-scroll">
            <div className="flex flex-col items-center h-full justify-center">
              TODO: RequestPlayground
              <WorkspaceDetailsClient workspaceId={workspaceId} />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={35}
          maxSize={40}
          minSize={25}
          className="flex"
        >
          <div className="h-full w-full overflow-hidden">
            <WorkspaceSidebar />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </HydrationBoundary>
  );
}
