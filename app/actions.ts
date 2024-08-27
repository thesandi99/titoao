"use server";

//import 

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Prisma from "@prisma/client";
import { redirect } from "next/navigation";


//end-import


export async function updateUsername(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const username = formData.get("username") as string;
  const Bio = formData.get("bio") as string;
  const ImageUrl = formData.get("imageUrl") as string;

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
        bio: Bio,
        imageUrl: ImageUrl,
      },
    });

    return redirect("/");
  } catch (e) {
    throw e;
  }
}

export async function CreateCummunity(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;

  const data = await prisma.subtitoao.create({
    data: {
      name: name,
      userId: user.id,
    },
  });

  return redirect("/");
}
