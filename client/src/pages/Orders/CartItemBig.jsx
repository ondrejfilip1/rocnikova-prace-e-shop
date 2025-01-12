import { getProductById } from "@/models/Product";
import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { deleteItem, updateQuantity } from "@/models/Cart";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import classNames from "classnames";
import s from "./Orders.module.css";

export default function CartItemBig({
  productId,
  quantity: origQuantity,
  color,
  itemId,
  itemOrigId,
  reloadCart,
  itemPrice,
  removeItemPrice,
}) {
  const [product, setProducts] = useState();
  const [isLoaded, setLoaded] = useState();
  const [quantity, setQuantity] = useState(origQuantity);

  const colors = {
    white: "w",
    black: "b",
    olive: "o",
    gray: "g",
    beige: "be",
    brown: "br",
  };

  const loadItem = async () => {
    const data = await getProductById(productId);
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setProducts(data.payload);
      //console.log(data.payload);
      setLoaded(true);
    }
  };

  // timhle ziskam ceny produktu, ktery pak jdou do Orders
  useEffect(() => {
    if (product) {
      itemPrice(itemId, product.price * quantity);
    }
  }, [quantity, product]);

  useEffect(() => {
    loadItem();
  }, []);

  const handleDelete = async () => {
    const data = await deleteItem(itemId);
    if (data.status === 200) {
      if (product) {
        removeItemPrice(itemId);
      }
      reloadCart();
    }
    // TODO: tady by neco melo bejt (if status 404 nebo 500)
  };

  const plusQuantity = async () => {
    if (quantity < 30) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      const data = await updateQuantity(itemId, {
        itemId: itemOrigId,
        newQuantity: newQuantity,
      });
      itemPrice(itemId, product.price * newQuantity);
      //console.log(data.status);
    }
  };

  const minusQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const data = await updateQuantity(itemId, {
        itemId: itemOrigId,
        newQuantity: newQuantity,
      });
      itemPrice(itemId, product.price * newQuantity);
      //console.log(data.status);
    }
  };

  if (!isLoaded) {
    return (
      <>
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin my-10"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center background-light-hover transition-colors rounded-md py-3 px-4">
        <div className="flex items-center">
          <div className="h-20 flex items-center">
            <img
              src={`${product.imagePath}front_${colors[color]}.avif`}
              alt={product.name}
              className="w-20 my-2"
              draggable="false"
            />
          </div>
          <div className="ml-4">
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm">{product.price} Kč</div>
            <div className="text-sm">{quantity}x</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Trash2
                  className="cursor-pointer background-button-hover p-1 min-h-6 min-w-6 inline-block rounded-md transition-colors"
                  size={24}
                  onClick={handleDelete}
                />
              </TooltipTrigger>
              <TooltipContent className="text-sm background-primary-light text-red-900 outline-none border-none">
                <p>Odebrat z košíku</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex items-center">
            <Minus
              className="bg-transparent background-button-hover transition-colors text-red-900 p-1 min-h-6 min-w-6 cursor-pointer rounded-md"
              onClick={minusQuantity}
            />
            <Input
              type="number"
              value={quantity}
              className={classNames(
                "bg-transparent border-none !text-sm text-center p-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
                s.remove_arrows
              )}
              min="1"
              max="30"
              readOnly
            />
            <Plus
              className="bg-transparent background-button-hover transition-colors text-red-900 p-1 min-h-6 min-w-6 cursor-pointer rounded-md"
              onClick={plusQuantity}
            />
          </div>
          <div>{product.price * quantity} Kč</div>
        </div>
      </div>
    </>
  );
}
