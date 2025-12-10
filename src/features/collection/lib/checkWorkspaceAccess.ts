import { prisma } from "@/lib/prisma";

export async function checkWorkspaceAccess(
  userId: string,
  workspaceId: string
) {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      OR: [{ ownerId: userId }, { members: { some: { userId } } }],
    },
  });

  return Boolean(workspace);
}
