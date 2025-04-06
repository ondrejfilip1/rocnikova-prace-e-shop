import { Trash2, FileText, Star } from "lucide-react";
import { deleteReview } from "@/models/Reviews";
import moment from "moment";
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
import { useState } from "react";
import classNames from "classnames";

export default function ReviewBox(props) {
  const [openContent, setOpenContent] = useState(false);

  const handleDeleteReview = async () => {
    const product = await deleteReview(
      props._id,
      localStorage.getItem("adminPassword")
    );
    if (product.status === 200) window.location.reload();
  };
  return (
    <>
      <p className="mb-0.5 font-medium">
        {props.username}

        <span className="float-right text-sm text-gray-400 font-normal">
          {moment(props.createdAt).locale("cz").format("DD/MM/YYYY HH:mm")}
        </span>
      </p>

      <Button
        variant="secondary"
        onClick={() => setOpenContent(!openContent)}
        className="mb-1"
      >
        <FileText />
        {openContent ? "Zavřít" : "Zobrazit"} zprávu
      </Button>
      <p
        className={classNames(
          "text-sm mb-2 mt-1",
          openContent ? "block" : "hidden"
        )}
      >
        {props.content}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">{props._id}</p>{" "}
        <div className="flex gap-0.5 items-center text-gray-400">
          {props.rating}
          <Star className="h-4 w-4" />
        </div>
      </div>

      <div className="flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Trash2 className="mt-1 rounded-md transition-colors hover:bg-gray-950/10 p-1.5 h-8 w-8 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Opravdu chcete smazat recenzi?</DialogTitle>
              <DialogDescription>Tato akce nelze vrátit zpět</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleDeleteReview}>Pokračovat</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-2 h-[1px] bg-black/10" />
    </>
  );
}
