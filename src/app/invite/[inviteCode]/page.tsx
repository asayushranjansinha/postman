import { redirect } from "next/navigation";
import { acceptWorkspaceInvite } from "@/features/workspace/server/actions";

interface InvitePageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { inviteCode } = await params;

  //   Call the server action
  const result = await acceptWorkspaceInvite({ token: inviteCode });

  console.log("Result in server : ", result);
  // Handle the result and redirect
  if (result.success && result.data?.workspaceId) {
    // Redirect to the workspace page
    redirect(`/workspace/${result.data.workspaceId}`);
  } else {
    // If there's an error, redirect to an error page or home with error message
    // You can customize this based on your needs
    const errorMessage = encodeURIComponent(
      result.message || "Failed to accept invitation"
    );
    throw new Error(errorMessage);
  }

  //   console.log(inviteCode);
}
