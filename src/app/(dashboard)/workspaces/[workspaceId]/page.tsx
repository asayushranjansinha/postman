// app/dashboard/[workspaceId]/page.tsx
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
import { getWorkspaceById } from "@/features/workspace/actions";
import { getCollections } from "@/features/collection/actions"; // ADD THIS
import { RequestPlayGround } from "@/features/workspace/components/RequestPlayGround";
import { RequestSidebar } from "@/features/workspace/components/RequestSidebar";

type PageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { workspaceId } = await params;

  const queryClient = new QueryClient();

  // Prefetch workspace details
  await queryClient.prefetchQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspaceById(workspaceId),
  });

  // Prefetch collections for this workspace
  await queryClient.prefetchQuery({
    queryKey: ["collections", workspaceId],
    queryFn: () => getCollections(workspaceId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={65} minSize={40}>
          <div className="h-full divide-y overflow-y-scroll">
            <RequestPlayGround workspaceId={workspaceId} />
            {/* Remove dummy divs, add actual content */}
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
            {/* Pass workspaceId as prop instead of using store */}
            <RequestSidebar workspaceId={workspaceId} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </HydrationBoundary>
  );
}
