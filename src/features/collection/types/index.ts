import { HttpMethod } from "@prisma/client";

export interface CreateCollectionInput {
  name: string;
  workspaceId: string;
}

export interface RenameCollectionInput {
  name?: string;
}

export interface PrismaCollectionWithWorkspaceID {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  workspaceId: string;
}

export interface PrismaCollectionWithRequests
  extends PrismaCollectionWithWorkspaceID {
  requests: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    method: HttpMethod;
    body: string | null;
    collectionId: string;
  }[];
}
