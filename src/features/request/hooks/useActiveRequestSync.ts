
/**
 * @fileoverview Custom hook to synchronize the active request data from the server
 * into the client-side editor store whenever the active request ID changes.
 */

import { getRequestDetailsById } from "@/features/request/server/action";
import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";
import { useEffect } from "react";


/**
 * Custom hook to synchronize the active request's details from the server
 * into the client-side Request Editor store.
 * * This hook runs a server action (`getRequestDetailsById`) whenever the 
 * `activeRequestId` in the store changes. It updates the corresponding 
 * tab data in the store with the latest details (URL, method, headers, 
 * query params, body) fetched from the database.
 * * It includes cleanup logic (`cancelled` flag) to prevent state updates 
 * if the component unmounts or the `activeRequestId` changes again 
 * before the asynchronous server action completes.
 */
export const useActiveRequestSync = () => {
  const activeRequestId = useRequestEditorStore((s) => s.activeRequestId);
  const setTabData = useRequestEditorStore((s) => s.setTabData);

  useEffect(() => {
    if (!activeRequestId) return;

    let cancelled = false;

    (async () => {
      const result = await getRequestDetailsById(activeRequestId);
      
      // Only update state if the effect hasn't been cancelled and the fetch was successful
      if (!cancelled && result.success && result.data) {
        setTabData(activeRequestId, result.data);
      }
    })();

    // Cleanup function: runs when the component unmounts or dependencies change
    return () => {
      cancelled = true;
    };
  }, [activeRequestId, setTabData]);
};