import { create } from "zustand";

type Workspace = {
  id: string;
  name: string;
};

interface WorkspaceStore {
  selectedWorkspace: Workspace | null;
  setSelectedWorkspace: (workspace: Workspace | null) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  selectedWorkspace: null,
  setSelectedWorkspace: (workspace: Workspace | null) =>
    set({ selectedWorkspace: workspace }),
}));
