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

/**
 * Defines the structure of the data representing a single request execution
 * (The HTTP Response data), based on the Prisma RequestRun model.
 * * This is the structure contained within the 'data' field of the successful
 * ServerActionResponse from executeFakeRequest.
 */
export interface FakeRequestRun {
  /** A unique ID for this specific run instance. */
  id: string;
  /** The ID of the request definition that was executed. */
  requestId: string;
  /** The time the run finished. */
  executedAt: Date;
  /** The HTTP status code (200, 404, etc.) or null for network errors. */
  status: number | null;
  /** The raw body content received in the response. */
  body: string | null;
  /** The time taken for the request in milliseconds. */
  durationMs: number | null;
  /** System error message if connection failed, otherwise null. */
  error: string | null;
  /** Key/value pairs for the response headers. */
  headers: { key: string; value: string }[];
}
