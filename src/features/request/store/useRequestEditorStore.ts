import { create } from "zustand";
import {
  FakeRequestRun,
  PrismaRequest,
  PrismaRequestDetails,
} from "@/features/request/types";

export interface ExtendedTabData extends PrismaRequestDetails {
  /** Stores the result of the last executed request run. */
  lastRun: FakeRequestRun | null;
}

type TabData = ExtendedTabData;

interface RequestEditorState {
  openTabIds: string[];
  tabs: Record<string, TabData>;
  activeRequestId: string | null;

  openRequestTab: (request: PrismaRequestDetails) => void;
  setActiveTab: (requestId: string) => void;
  closeRequestTab: (requestId: string) => void;

  /** Allows updating any field in the TabData, including request definition fields (name, url)
   * and the new 'lastRun' field.
   */
  setTabData: (requestId: string, data: Partial<TabData>) => void;
}

export const useRequestEditorStore = create<RequestEditorState>((set, get) => ({
  openTabIds: [],
  tabs: {},
  activeRequestId: null,

  openRequestTab: (request) => {
    const { id } = request;
    const { openTabIds, tabs } = get();

    const isNewTab = !tabs[id];

    const newTabData: TabData = {
      ...request,
      lastRun: tabs[id]?.lastRun || null,
    };

    set({
      openTabIds: isNewTab ? [...openTabIds, id] : openTabIds,
      tabs: {
        ...tabs,
        [id]: newTabData,
      },
      activeRequestId: id,
    });
  },

  setActiveTab: (requestId) => set({ activeRequestId: requestId }),

  closeRequestTab: (requestIdToClose) => {
    const { openTabIds, tabs, activeRequestId } = get();

    const closedTabIndex = openTabIds.indexOf(requestIdToClose);
    if (closedTabIndex === -1) return;

    let newActiveRequestId = activeRequestId;

    if (requestIdToClose === activeRequestId) {
      const newIndex =
        closedTabIndex === openTabIds.length - 1
          ? closedTabIndex - 1
          : closedTabIndex + 1;

      newActiveRequestId = openTabIds[newIndex] || null;
    }

    const { [requestIdToClose]: _, ...newTabs } = tabs;
    const newOpenTabIds = openTabIds.filter((id) => id !== requestIdToClose);

    set({
      openTabIds: newOpenTabIds,
      tabs: newTabs as Record<string, TabData>,
      activeRequestId: newActiveRequestId,
    });
  },

  setTabData: (requestId, data) =>
    set((state) => {
      const currentTab = state.tabs[requestId];
      if (!currentTab) return state;

      return {
        tabs: {
          ...state.tabs,
          [requestId]: {
            ...currentTab,
            ...data,
          } as TabData,
        },
      };
    }),
}));