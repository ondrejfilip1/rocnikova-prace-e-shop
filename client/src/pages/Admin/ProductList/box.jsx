import { Link } from "react-router-dom";
import { SquarePen, Trash2 } from "lucide-react";
import { deleteProduct } from "@/models/Product";
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

export default function ProductBox(props) {
  const handleDeleteProduct = async () => {
    const product = await deleteProduct(
      props._id,
      localStorage.getItem("adminPassword")
    );
    if (product.status === 200) {
      window.location.reload();
    }
  };
  return (
    <>
      <p className="mb-0.5 font-medium">{props.name}</p>
      <p className="text-sm text-gray-400">{props._id}</p>
      <div className="flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Trash2 className="mt-1 rounded-md transition-colors hover:bg-gray-950/10 p-1.5 h-8 w-8 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Opravdu chcete smazat produkt?</DialogTitle>
              <DialogDescription>Tato akce nelze vrátit zpět</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleDeleteProduct}>Pokračovat</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Link to={`/admin/update-product/${props._id}`}>
          <SquarePen className="mt-1 rounded-md transition-colors hover:bg-gray-950/10 p-1.5 h-8 w-8" />
        </Link>
      </div>
      <div className="my-2 h-[1px] bg-black/10" />
    </>
  );
}
