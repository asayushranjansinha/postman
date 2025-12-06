"use server";

import { RequestMethod } from "@prisma/client";

import prisma from "@/lib/database";

import { RequestModel } from "../types";
import { getCurrentUser } from "@/features/authentication/action";

/**
 * Server action to add a request to a collection
 *
 * @param collectionId - The id of the collection
 * @param request - The request to add
 * @returns An object containing the success status and the request
 */
export const addRequestToCollection = async (
  collectionId: string,
  request: Omit<RequestModel, "id">
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify user owns the collection
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      include: { workspace: true },
    });

    if (!collection) {
      return { success: false, error: "Collection not found" };
    }

    if (collection.workspace.ownerId !== user.id) {
      return { success: false, error: "Forbidden" };
    }

    // Create the request
    const newRequest = await prisma.request.create({
      data: {
        collectionId,
        name: request.name,
        method: request.method,
        url: request.url,
        parameters: request.parameters,
        headers: request.headers,
        body: request.body,
        response: request.response,
      },
    });

    return { success: true, request: newRequest };
  } catch (error) {
    console.error("Error adding request to collection:", error);
    return { success: false, error: "Failed to add request to collection" };
  }
};

/**
 * Server action to save a request
 *
 * @param request - The request to save
 * @returns An object containing the success status and the request
 */

export const saveRequest = async (request: RequestModel) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify user owns the collection
    const existingRequest = await prisma.request.findUnique({
      where: { id: request.id },
      include: {
        collection: {
          include: { workspace: true },
        },
      },
    });

    if (!existingRequest) {
      return { success: false, error: "Request not found" };
    }

    if (existingRequest.collection.workspace.ownerId !== user.id) {
      return { success: false, error: "Forbidden" };
    }

    const updatedRequest = await prisma.request.update({
      where: {
        id: request.id,
      },
      data: {
        name: request.name,
        method: request.method,
        url: request.url,
        parameters: request.parameters,
        headers: request.headers,
        body: request.body,
        response: request.response,
      },
    });

    return { success: true, request: updatedRequest };
  } catch (error) {
    console.error("Error saving request:", error);
    return { success: false, error: "Failed to save request" };
  }
};

/**
 * Server action to get all requests in a collection
 *
 * @param collectionId - The id of the collection
 * @returns An object containing the success status and the requests
 */

export const getAllRequestsInCollection = async (collectionId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify user owns the collection
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      include: { workspace: true },
    });

    if (!collection) {
      return { success: false, error: "Collection not found" };
    }

    if (collection.workspace.ownerId !== user.id) {
      return { success: false, error: "Forbidden" };
    }
    const requests = await prisma.request.findMany({
      where: {
        collectionId,
      },
    });

    return { success: true, requests };
  } catch (error) {
    console.error("Error fetching requests:", error);
    return { success: false, error: "Failed to fetch requests" };
  }
};

/**
 * Server action to update a request
 *
 * @param requestId - The id of the request
 * @param data - The data to update
 * @returns An object containing the success status and the request
 */
export const updateRequest = async (
  requestId: string,
  data: {
    name: string;
    url: string;
    method: RequestMethod;
  }
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify user owns the request through collection
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        collection: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!request) {
      return { success: false, error: "Request not found" };
    }

    if (request.collection.workspace.ownerId !== user.id) {
      return { success: false, error: "Forbidden" };
    }

    const updatedRequest = await prisma.request.update({
      where: { id: requestId },
      data: {
        name: data.name,
        url: data.url,
        method: data.method,
      },
    });

    return { success: true, request: updatedRequest };
  } catch (error) {
    console.error("Error updating request:", error);
    return { success: false, error: "Failed to update request" };
  }
};

/**
 * Server action to delete a request
 
 * @param requestId - The id of the request
 * @returns An object containing the success status and the request
 */

export const deleteRequest = async (requestId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify user owns the request through collection
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        collection: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!request) {
      return { success: false, error: "Request not found" };
    }

    if (request.collection.workspace.ownerId !== user.id) {
      return { success: false, error: "Forbidden" };
    }

    await prisma.request.delete({
      where: { id: requestId },
    });

    return { success: true, collectionId: request.collectionId };
  } catch (error) {
    console.error("Error deleting request:", error);
    return { success: false, error: "Failed to delete request" };
  }
};
