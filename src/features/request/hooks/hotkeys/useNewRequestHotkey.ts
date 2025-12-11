import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useRequestEditorStore } from "@/features/request/store/useRequestEditorStore";

/**
 * Custom hook to register the hotkey (Ctrl+Shift+N / Cmd+Alt+N)
 * to create a new, unsaved request tab in the editor store.
 */
export const useNewRequestHotkey = () => {
  const newRequestTab = useRequestEditorStore((s) => s.newRequestTab);

  const handleNewRequestHotkey = useCallback(
    (event: KeyboardEvent) => {
      // Prevent default browser behavior (like opening a new private window)
      event.preventDefault();
      event.stopPropagation();
      
      newRequestTab();
    },
    [newRequestTab]
  );

  // Registering the hotkey: "ctrl+shift+n" for Windows/Linux and "meta+alt+n" for Mac
  useHotkeys(
    "ctrl+shift+n, meta+alt+n",
    handleNewRequestHotkey,
    { 
      preventDefault: true, 
      enableOnFormTags: false, // Do not trigger if user is typing in an input field
    },
    [handleNewRequestHotkey]
  );
};