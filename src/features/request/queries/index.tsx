import { useQuery } from "@tanstack/react-query";
import {
  getRequestDetailsById,
  getRequestsByCollectionId,
} from "../server/action";

/**
 * Hook to list all requests by collection id
 * @param collectionId The ID of the collection
 * @returns List of requests by collection id (PrismaRequestDetails[])
 */
export const useListRequestsByCollectionIdQuery = (collectionId: string) => {
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: () => getRequestsByCollectionId(collectionId),
  });
};


/**
 * Hook to fetch the detailed information for a single request
 * @param requestId The ID of the request
 * @returns Detailed request information (PrismaRequestDetails)
 */
export const useRequestDetailsQuery = (requestId: string) => {
  return useQuery({
    queryKey: ["requests", requestId],
    queryFn: () => getRequestDetailsById(requestId),
  });
};