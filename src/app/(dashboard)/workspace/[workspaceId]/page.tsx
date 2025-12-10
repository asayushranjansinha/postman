import React from "react";

type PageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function WorkspaceDetailsPage({ params }: PageProps) {
  const { workspaceId } = await params;
  console.log(workspaceId);
  return (
    <div className="min-h-svh flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold">Workspace Details</h1>
      <p className="text-gray-500">{workspaceId}</p>
    </div>
  );
}
