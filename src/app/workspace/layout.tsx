import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { WorkspacesHeader } from "@/features/workspace/components/WorkspacesHeader";
import { WorkspaceSidebar } from "@/features/workspace/components/WorkspaceSidebar";
import React from "react";

function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <WorkspaceSidebar />
      <SidebarInset className="overflow-x-hidden">
        <WorkspacesHeader />
        <div className='max-h-[calc(100vh-53px)] h-[calc(100vh-53px)] flex flex-1 overflow-x-hidden'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default WorkspaceLayout;
