import {
  PrismaRequestDetails,
  PrismaRequestRun
} from "@/features/request/types";
import { create } from "zustand";
import { nanoid } from "nanoid";

export interface ExtendedTabData extends PrismaRequestDetails {
  /** Stores the result of the last executed request run. */
  lastRun: PrismaRequestRun | null;
  /** Flag to indicate if the request exists in the database. 
   * false for new, unsaved requests; true for requests fetched from Prisma or after a successful save. 
   */
  isSaved: boolean; 
}

type TabData = ExtendedTabData;

interface RequestEditorState {
  openTabIds: string[];
  tabs: Record<string, TabData>;
  activeRequestId: string | null;

  openRequestTab: (request: PrismaRequestDetails) => void;
  /** Creates a new, unsaved request tab with a unique nanoid ID and an empty collectionId. */
  newRequestTab: () => void; 
  setActiveTab: (requestId: string) => void;
  closeRequestTab: (requestId: string) => void;

  /** Allows updating any field in the TabData, including request definition fields (name, url)
   * and the new 'lastRun' field.
   */
  setTabData: (requestId: string, data: Partial<TabData>) => void;
}

// Helper function to create default data for a brand new, unsaved request
const createDefaultRequest = (): TabData => {
  const now = new Date();
  const tempId = nanoid();

  return {
    // --- PrismaRequest fields ---
    id: tempId, 
    name: "New Request",
    createdAt: now,
    updatedAt: now,
    url: "https://api.example.com/data",
    method: "GET", 
    body: null,
    collectionId: "", 

    // --- PrismaRequestDetails fields ---
    headers: [],
    queryParams: [],

    // --- ExtendedTabData fields ---
    lastRun: null,
    isSaved: false, // NEW: Unsaved by default
  };
};


export const useRequestEditorStore = create<RequestEditorState>((set, get) => ({
  openTabIds: [],
  tabs: {},
  activeRequestId: null,

  openRequestTab: (request) => {
    const { id } = request;
    const { openTabIds, tabs } = get();

    const isNewTab = !tabs[id];

    // Request is being opened from a source (presumably the database), so it is considered saved.
    const newTabData: TabData = {
      ...request,
      lastRun: tabs[id]?.lastRun || null,
      isSaved: true, // NEW: Existing requests are saved
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

  newRequestTab: () => {
    const defaultRequest = createDefaultRequest();
    const { id } = defaultRequest;
    const { openTabIds, tabs } = get();
    
    // Check if the temporary ID already exists (highly unlikely with nanoid, but good practice)
    if (tabs[id]) return; 

    set({
      openTabIds: [...openTabIds, id],
      tabs: {
        ...tabs,
        [id]: defaultRequest,
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

    // Safely remove the closed tab from the tabs object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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