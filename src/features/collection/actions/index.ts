"use server";

import { getCurrentUser } from "@/features/authentication/action";
import prisma from "@/lib/database";

/**
 * Server action to create a new collection
 *
 * @param workspaceId - The id of the workspace
 * @returns An object containing the success status and the collection
 */
export const createCollection = async (workspaceId: string, name: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  try {
    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        members: {
          some: {
            userId: user.id,
          },
        },
      },
    });
    if (!workspace) {
      return { success: false, error: "Workspace not found or access denied" };
    }

    const newCollection = await prisma.collection.create({
      data: {
        name,
        workspace: {
          connect: {
            id: workspaceId,
          },
        },
      },
    });
    return { success: true, collection: newCollection };
  } catch (error) {
    console.error("Error creating collection:", error);
    return { success: false, error: "Failed to create collection" };
  }
};

/**
 * Server action to get all collections for a workspace in desc order
 *
 * @param workspaceId - The id of the workspace
 * @returns An object containing the success status and the collections
 */
export const getCollections = async (workspaceId: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  try {
    const collections = await prisma.collection.findMany({
      where: {
        workspaceId,
        workspace: {
          members: {
            some: {
              userId: user.id,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, collections };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { success: false, error: "Failed to fetch collections" };
  }
};

/**
 * Server action to delete a collection by id
 
 * @param collectionId - The id of the collection
 * @returns An object containing the success status and the deleted collection
 */
export const deleteCollectionById = async (collectionId: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const deletedCollection = await prisma.collection.delete({
      where: {
        id: collectionId,
        workspace: {
          members: {
            some: {
              userId: user.id,
            },
          },
        },
      },
    });

    if (!deletedCollection) {
      throw new Error("Collection not found or you do not have permission");
    }

    return { success: true, collection: deletedCollection };
  } catch (error) {
    console.error("Error deleting collection:", error);
    return { success: false, error: "Failed to delete collection" };
  }
};

/**
 * Server action to update a collection by id
 *
 * @param collectionId - The id of the collection
 * @param name - The name of the collection
 * @returns An object containing the success status and the updated collection
 */
export const updateCollection = async (collectionId: string, name: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const updatedCollection = await prisma.collection.update({
      where: {
        id: collectionId,
        workspace: {
          members: {
            some: {
              userId: user.id,
            },
          },
        },
      },
      data: {
        name,
      },
    });

    if (!updatedCollection) {
      throw new Error("Collection not found or you do not have permission");
    }

    return { success: true, collection: updatedCollection };
  } catch (error) {
    console.error("Error updating collection:", error);
    return { success: false, error: "Failed to update collection" };
  }
};
