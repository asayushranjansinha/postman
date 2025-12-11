import { HttpMethod } from "@prisma/client";

export interface CreateRequestInput {
  name: string;
  method: HttpMethod;
  url: string;
  workspaceId: string;
  collectionId: string;
}

export interface UpdateRequestInput {
  id:string;
  name: string;
  url: string;
  method: HttpMethod;
}

export interface PrismaRequest {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  method: HttpMethod;
  body: string | null;
  collectionId: string;
}

export interface PrismaRequestDetails extends PrismaRequest {
  headers: {
    id: string;
    requestId: string;
    key: string;
    value: string;
  }[];
  queryParams: {
    id: string;
    requestId: string;
    key: string;
    value: string;
  }[];
}
