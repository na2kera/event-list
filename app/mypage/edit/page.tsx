import { getServerSession } from "next-auth";
import { authOptions } from "lib/authOptions";
import { getUserProfile } from "lib/api/client.ts/userApi";
import { Header } from "components/layout/Header";
import { ProfileEditFormSimple } from "../../../components/mypage/ProfileEditFormSimple";

export default async function ProfileEditPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const user = await getUserProfile(session.user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ProfileEditFormSimple initialData={user} />
      </div>
    </div>
  );
}
