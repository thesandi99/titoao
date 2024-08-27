import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

async function getData(userId: string) {
  if (!userId) {
    return null;
  }
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      email: true,
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return data;
}

export async function UserNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="gap-x-2 flex">
        <Button className="xzolp746" variant="secondary" asChild>
          <RegisterLink>Sign up</RegisterLink>
        </Button>

        <Button variant="default" asChild>
          <LoginLink>Log in</LoginLink>
        </Button>
      </div>
    );
  }

  const data = await getData(user?.id);

  return (
    <div className="gap-x-2 flex">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              className="object-cover w-fit"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile Avitar"
            />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-66 p-4" align="center">
          <DropdownMenuItem>
            <Link href={`/${data?.userName}/`} className="flex gap-3 p-3">
              <Avatar className="w-14 h-14  gap-x-3 object-cover">
                <AvatarImage
                  className="object-cover w-40"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="Profile Avitar"
                />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div className="block">
                <p className="font-bold">
                  {data?.firstName} {data?.lastName}
                </p>
                <span className="text-muted-foreground ">{data?.email}</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <Separator />
          <Link href={`/${data?.userName}/settings/`}>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>helo</DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <LogoutLink>Log Out</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
