import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    Username: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { Username } = params;

  const session = await getKindeServerSession();

  const data = await db.user.findFirst({
    where: { userName: Username },
    select: {
      userName: true,
    },
  });

  if (!data) return notFound();

  return (
    <div className="flex justiy-center">
      <div className="font-sm">
        <h1 className="font-bold text-sm md:text-4xl h-14">
          r/{data?.userName}
        </h1>
      </div>
    </div>
  );
};

export default page;
