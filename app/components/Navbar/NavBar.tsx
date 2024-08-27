import { Button } from "@/components/ui/button";
import Logo1 from "./Logo";
import ModeToggle from "./ThemToggle";
import Link from "next/link";
import { UserNav } from "./UserNav";
import InputNav from "./Input";

export default function Navbar() {
  return (
    <nav className="max-h-[7vh] w-[100%] flex justify-center ">
      <div className="w-[1200px] max-auto p-3  flex justify-between content-center bg-[smoke]">
        <Link href="/" className="flex gap-2 ">
          <Logo1 />
          <span className="xzolp746 text-lg self-center font-color-[smoke] font-bold">
            titooao
          </span>
        </Link>
        <div className="flex gap-4 lg:flex md:none ">
          <InputNav />
          <ModeToggle />
          <UserNav />
          <Button className="xzolp746" variant="secondary">
            Get App
          </Button>
        </div>
      </div>
    </nav>
  );
}
