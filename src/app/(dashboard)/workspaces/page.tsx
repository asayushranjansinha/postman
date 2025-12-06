// app/workspaces/page.tsx
import { redirect } from "next/navigation";
import { getWorkspaces } from "@/features/workspace/actions";

export default async function WorkspacesPage() {
  const result = await getWorkspaces();
  const workspaces = result.workspaces;

  // Error
  if (result.error) {
    throw new Error(result.error);
  }

  // Redirect to first workspace if available
  if (workspaces && workspaces.length > 0) {
    redirect(`/workspaces/${workspaces[0].id}`);
  }

  // Show create workspace page if no workspaces
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-2xl font-semibold">Welcome to Your Workspace</h1>
      <p className="text-muted-foreground">
        Create your first workspace to get started
      </p>
      {/* TODO: Add CreateWorkspaceButton component */}
    </div>
  );
}
