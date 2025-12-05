import { getCurrentUser } from "@/features/authentication/action";
import { UserButton } from "@/features/authentication/components/UserButton";

async function HomePage() {
  const session = await getCurrentUser();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="inline-block">
        <UserButton
          user={session}
          size="lg"
          showBadge
          showEmail
          showMemberSince
        />
      </div>
    </div>
  );
}

export default HomePage;
