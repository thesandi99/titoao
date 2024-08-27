import prisma from "@/lib/db";
import { SettingsForm } from "./SettingForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      bio: true,
      imageUrl: true,
    },
  });

  return data;
}

export default async function Settings() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  const data = await getData(user.id);

  return (
    <div className="max-h-[7vh] w-[100%] flex justify-center ">
      <div className="w-[1200px] max-auto p-3  flex justify-between content-center bg-[smoke]">
        <SettingsForm
          imageUrl={data?.imageUrl}
          bio={data?.bio}
          username={data?.userName}
        />
      </div>
    </div>
  );
}
