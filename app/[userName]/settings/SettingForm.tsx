"use client";

import { CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { Separator } from "@/components/ui/separator";
import { updateUsername } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { PenIcon } from "lucide-react";
import Image from "next/image";

const initialState = {
  message: "",
  status: "",
};

export function SettingsForm({
  username,
  bio,
  imageUrl,
}: {
  username: string | null | undefined;
  bio: string | null | undefined;
  imageUrl: string | null | undefined;
}) {
  const [state, formAction] = useFormState(updateUsername, initialState);
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(imageUrl);
  const avatarData = [
    {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      alt: "@shadcn",
    },
    {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_1280.png",
      alt: "@shadcn",
    },
    {
      url: "https://cdn.pixabay.com/photo/2022/12/25/04/42/satoru-gojo-7676809_1280.jpg",
      alt: "@shadcn",
    },
  ];

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Succesfull",
        description: state.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <form action={formAction} className="w-full">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <Separator className="my-4" />
      <div className="flex w-full">
        <aside className="w-[30%]">
          <ul>
            <li>Profile Settings</li>
          </ul>
        </aside>
        <main className=" w-[70%]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Profile Settings
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Update your profile information.
              </CardDescription>
              <Separator className="flex mt-4" />
            </CardHeader>
            <CardContent>
              <div className="w-full flex justify-around">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base">
                    Username
                  </Label>
                  <Input
                    defaultValue={username ?? undefined}
                    name="username"
                    required
                    className="mt-2"
                    min={2}
                    maxLength={21}
                  />

                  {state?.status === "error" && (
                    <p className="text-destructive mt-1">{state.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-picture" className="text-base">
                      Profile Picture
                    </Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt="@shadcn"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Popover>
                        <PopoverTrigger>
                          <PenIcon />
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="p-4">
                            <h2 className="text-lg font-bold">Change Avatar</h2>
                            <p className="text-sm text-muted-foreground">
                              Upload a new profile picture
                            </p>
                            <div className="flex flex-wrap gap-4">
                              {avatarData.map((image, index) => (
                                <Image
                                  key={index}
                                  src={image.url}
                                  width={50}
                                  height={50}
                                  alt={image.alt}
                                  className="rounded-full cursor-pointer"
                                  onClick={() => handleImageSelect(image.url)}
                                />
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-base">
                  Bio
                </Label>
                <Textarea
                  defaultValue={bio ?? undefined}
                  name="bio"
                  required
                  className="mt-2"
                  maxLength={21}
                />
              </div>
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <SubmitButton text="Change" />
            </CardFooter>
          </Card>
        </main>
      </div>
    </form>
  );
}
