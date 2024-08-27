import db from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    subname: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { subname } = params;

  const subreddit = await db.subtitoao.findFirst({
    where: { name: subname },
    select: {
      name: true,
      createdAt: true,
    },
  });

  if (!subreddit) return notFound();

  return (
    <div className="flex justify-center ">
      <div className="w-[1200px] max-auto overflow-hidden ">
        <div className="flex w-[100%]">
          <div className="  w-[33.333%]">
            <p>helo</p>
          </div>
          <div className="w-[33.333%]">
            <p>helo</p>
          </div>
          <div className="w-[33.333%]">
            <p>helo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
