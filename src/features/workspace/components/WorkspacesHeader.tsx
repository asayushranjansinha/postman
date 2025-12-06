import { SidebarTrigger } from "@/components/ui/sidebar";
import { InviteMember } from "./InviteMember";
import { WorkspaceSearchbar } from "./WorkspaceSearchbar";
import { WorkspaceSelector } from "./WorkspaceSelector";
import { getCurrentUser } from "@/features/authentication/action";
import { UserButton } from "@/features/authentication/components/UserButton";

export const WorkspacesHeader = async () => {
  const user = await getCurrentUser();

  return (
    <header className="p-2 border-b flex items-center bg-background gap-3 overflow-hidden">
      <SidebarTrigger />

      <div className="flex flex-1 items-center justify-between gap-3">
        {/* Searchbar takes full width */}
        <WorkspaceSearchbar className="flex-1 max-w-sm mx-auto" />

        {/* Right side */}
        <div className="flex items-center gap-3">
          <InviteMember />
          <WorkspaceSelector />
          {/* @ts-ignore */}
          <UserButton user={user} />
        </div>
      </div>
    </header>
  );
};
