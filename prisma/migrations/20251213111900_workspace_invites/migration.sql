-- CreateTable
CREATE TABLE "workspace_invite" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Member" NOT NULL DEFAULT 'MEMBER',
    "workspaceId" TEXT NOT NULL,
    "inviterId" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InviterInvites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InviterInvites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "workspace_invite_token_key" ON "workspace_invite"("token");

-- CreateIndex
CREATE INDEX "workspace_invite_workspaceId_idx" ON "workspace_invite"("workspaceId");

-- CreateIndex
CREATE INDEX "workspace_invite_inviterId_idx" ON "workspace_invite"("inviterId");

-- CreateIndex
CREATE INDEX "workspace_invite_email_idx" ON "workspace_invite"("email");

-- CreateIndex
CREATE INDEX "_InviterInvites_B_index" ON "_InviterInvites"("B");

-- AddForeignKey
ALTER TABLE "workspace_invite" ADD CONSTRAINT "workspace_invite_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InviterInvites" ADD CONSTRAINT "_InviterInvites_A_fkey" FOREIGN KEY ("A") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InviterInvites" ADD CONSTRAINT "_InviterInvites_B_fkey" FOREIGN KEY ("B") REFERENCES "workspace_invite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
