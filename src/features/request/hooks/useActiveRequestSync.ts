// src/features/request/hooks/useActiveRequestSync.ts

import { getRequestDetailsById } from "@/features/request/server/action";
import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";
import { useEffect } from "react";


export const useActiveRequestSync = () => {
  const activeRequestId = useRequestEditorStore((s) => s.activeRequestId);
  const setTabData = useRequestEditorStore((s) => s.setTabData);

  useEffect(() => {
    if (!activeRequestId) return;

    let cancelled = false;

    (async () => {
      const result = await getRequestDetailsById(activeRequestId);
      if (!cancelled && result.success && result.data) {
        setTabData(activeRequestId, result.data);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeRequestId, setTabData]);
};
