/*
  Warnings:

  - You are about to drop the column `email` on the `workspace_invite` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "workspace_invite_email_idx";

-- AlterTable
ALTER TABLE "workspace_invite" DROP COLUMN "email";

-- AddForeignKey
ALTER TABLE "workspace_invite" ADD CONSTRAINT "workspace_invite_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
