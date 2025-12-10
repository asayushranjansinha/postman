export interface WorkspaceCreateInput {
  name: string;
}

export interface WorkspaceUpdateInput {
  name?: string;
}

export interface PrismaWorkspace {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
