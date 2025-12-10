export interface WorkspaceCreateInput {
  name: string;
}

export interface WorkspaceRenameInput {
  name?: string;
}

export interface PrismaWorkspace {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceListResponse {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    name: string;
    id: string;
  };
}
