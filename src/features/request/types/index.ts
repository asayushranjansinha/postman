import { HttpMethod } from "@prisma/client";

export interface CreateRequestInput {
  name: string;
  method: HttpMethod;
  url: string;
  workspaceId: string;
  collectionId: string;
}

export interface SaveUnsavedRequestInput extends CreateRequestInput {
  body: string | null;
  headers: { key: string; value: string }[];
  queryParams: { key: string; value: string }[];
  collectionId: string;
}

export interface UpdateRequestInput {
  id: string;
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



// This matches the RequestRun model, plus its related ResponseHeader[]
export type PrismaRequestRun = {
  id: string;
  requestId: string;
  executedAt: Date;
  status: number | null;
  body: string | null;
  durationMs: number | null;
  error: string | null;
  headers: {
    id: string;
    key: string;
    value: string;
  }[];
};

// Represents the full data needed to execute an HTTP request
export type ExecutionDetails = {
  url: string;
  method: HttpMethod;
  body: string | null;
  headers: { key: string; value: string }[];
  queryParams: { key: string; value: string }[];
};
