import { RequestMethod } from "@prisma/client";

export type RequestModel = {
  id: string;
  name: string;
  method: RequestMethod;
  url: string;
  parameters?: string;
  headers?: string;
  body?: string;
  response?: string;
};
