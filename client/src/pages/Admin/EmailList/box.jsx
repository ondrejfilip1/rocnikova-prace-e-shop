import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { removeEmail } from "@/models/Mail";

export default function EmailBox(props) {
  const handleDeleteEmail = async () => {
    const email = await removeEmail(
      props._id,
      localStorage.getItem("adminPassword")
    );
    if (email.status === 200) window.location.reload();
  };
  return (
    <>
      <p className="mb-0.5 font-medium">
        {props.email}
        <span className="float-right text-sm text-gray-400 font-normal">
          {props.createdAt}
        </span>
      </p>

      <p className="text-sm text-gray-400">{props._id}</p>

      <div className="flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Trash2 className="mt-1 rounded-md transition-colors hover:bg-gray-950/10 p-1.5 h-8 w-8 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Opravdu chcete smazat email?</DialogTitle>
              <DialogDescription>Tato akce nelze vrátit zpět</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleDeleteEmail}>Pokračovat</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-2 h-[1px] bg-black/10" />
    </>
  );
}
