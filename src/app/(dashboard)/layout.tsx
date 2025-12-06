import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WorkspacesHeader } from "@/features/workspace/components/WorkspacesHeader";
import { WorkspaceSidebar } from "@/features/workspace/components/WorkspaceSidebar";
import { getWorkspaces } from "@/features/workspace/actions";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider defaultOpen={false}>
        <WorkspaceSidebar />
        <SidebarInset className="flex flex-col h-svh overflow-hidden">
          <WorkspacesHeader />
          <div className="flex-1 flex overflow-hidden">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
}

export default DashboardLayout;
