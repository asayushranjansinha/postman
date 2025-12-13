import { Member } from "@prisma/client";

export interface WorkspaceCreateInput {
  name: string;
}

export interface WorkspaceRenameInput {
  name?: string;
}

export interface PrismaWorkspace {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceListResponse {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    name: string;
    id: string;
  };
}

export interface InviteSentInput {
  /** The ID of the workspace to invite the user to */
  workspaceId: string;
  /** The role of the user in the workspace */
  role: AllowedInviteRoles;
}

export interface InviteAcceptInput {
  /** The invite token */
  token: string;
}
/**
 * Defines the roles that can be assigned to a new member via invitation.
 * It excludes 'OWNER' from the Member enum.
 */
export type AllowedInviteRoles = Exclude<Member, "OWNER">;