-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_workspaceId_fkey";

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
