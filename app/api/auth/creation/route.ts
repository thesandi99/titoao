import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) throw new Error("something is wrong");

  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? "", // Set default value to empty string if user.email is null or undefined
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        imageUrl: user.picture,

        userName: generateUsername("", 5, 9),
      },
    });
  }
  return NextResponse.redirect("http://localhost:3000");
}
