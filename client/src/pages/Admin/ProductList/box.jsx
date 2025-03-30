import { Link } from "react-router-dom";
import { SquarePen, Trash2, LinkIcon } from "lucide-react";
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
import classNames from "classnames";
import { categoriesTranslated } from "@/components/constants";

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
      <p className="mb-0.5 font-medium">
        {props.name}
        <span className="float-right text-sm text-gray-400 font-normal">
          {categoriesTranslated[props.category].toLowerCase()}
        </span>
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">{props._id}</p>
        <div className="flex gap-1">
          {props.color.map((color, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  color === "white" && "color_white_svg",
                  color === "black" && "color_black_svg",
                  color === "gray" && "color_gray_svg",
                  color === "brown" && "color_brown_svg",
                  color === "beige" && "color_beige_svg",
                  color === "olive" && "color_olive_svg",
                  color === "sea_blue" && "color_sea_blue_svg",
                  color === "red" && "color_red_svg",
                  color === "purple" && "color_purple_svg",
                  color === "light_blue" && "color_light_blue_svg",
                  color === "blue" && "color_blue_svg",
                  color === "green" && "color_green_svg",
                  color === "pastel_yellow" && "color_pastel_yellow_svg",
                  color === "pink" && "color_pink_svg",
                  "w-3.5 h-3.5 rounded-full border border-black/10"
                )}
              />
            );
          })}
        </div>
      </div>
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

        <Link to={`/product/${props._id}`} target="_blank">
          <LinkIcon className="mt-1 rounded-md transition-colors hover:bg-gray-950/10 p-1.5 h-8 w-8" />
        </Link>
      </div>
      <div className="my-2 h-[1px] bg-black/10" />
    </>
  );
}
