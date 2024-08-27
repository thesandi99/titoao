import { SubmitButton } from "@/app/[userName]/settings/SubmitButton";
import { CreateCummunity } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function CreateSubTitoao() {
  return (
    <div className="w-full justify-center flex ">
      <form action={CreateCummunity}>
        <div className="w-[1200px]  mt-4">
          <h1>Create Cummunity</h1>
          <Separator className="mt-3" />
          <p>username</p>
          <Input name="username" />
          <p>Name Your Cummnunity</p>
          <Input name="name" />
          <SubmitButton text="Save" />
        </div>
      </form>
    </div>
  );
}
