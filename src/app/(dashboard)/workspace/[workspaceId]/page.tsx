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
import { RequestPlayground } from "@/features/request/components/request-playground";
import { WorkspaceSidebar } from "@/features/workspace/components/WorkspaceSidebar";
import { MobileWorkspaceSheet } from "@/features/request/components/request-playground/MobileWorkspaceSheet";
import { getWorkspace } from "@/features/workspace/server/actions";

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
    <div className="h-svh w-full overflow-y-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Desktop Layout - Resizable Panels */}
        <div className="hidden md:block h-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={65} minSize={40}>
              <div className="h-svh w-full overflow-y-scroll">
                <RequestPlayground />
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
                <WorkspaceSidebar workspaceId={workspaceId} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout - Sheet + Playground */}
        <div className="md:hidden h-full flex flex-col">
          <RequestPlayground />
          <MobileWorkspaceSheet workspaceId={workspaceId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
