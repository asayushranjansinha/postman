"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): {
  copiedText: CopiedValue;
  copyFn: CopyFn;
  copied: boolean;
} {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [copied, setIsCopied] = useState(false);

  const copyFn: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
      toast("Copied to clipboard", {
        description: "You can paste it anywhere",
      });
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      setIsCopied(false);
      return false;
    }
  }, []);

  return { copiedText, copyFn, copied };
}
