export interface WorkspaceProps {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  //   members: MemberProps[];
}
