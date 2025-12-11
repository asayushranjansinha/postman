import { useQuery } from "@tanstack/react-query";
import { getRequestsByCollectionId } from "../server/action";


/**
 * Hook to list all requests by collection id
 * @returns List of requests by collection id
 */
export const useListRequestsByCollectionIdQuery = (collectionId: string) => {
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: () => getRequestsByCollectionId(collectionId),
  });
};

