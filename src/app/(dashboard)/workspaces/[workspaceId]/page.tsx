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
import { RequestPlayGround } from "@/features/workspace/components/RequestPlayGround";
import { RequestSidebar } from "@/features/workspace/components/RequestSidebar";

type PageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { workspaceId } = await params;

  // Prefetch workspace and hydrate it
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspaceById(workspaceId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResizablePanelGroup direction="horizontal">
        {/* Playground */}
        <ResizablePanel defaultSize={65} minSize={40}>
          <div className="h-full divide-y overflow-y-scroll">
            {/* TODO: Implement Playground Logic */}
            <RequestPlayGround />

            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
            <div className="h-72"></div>
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
            <RequestSidebar />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </HydrationBoundary>
  );
}
