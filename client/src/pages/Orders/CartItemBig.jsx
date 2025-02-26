import { getProductById } from "@/models/Product";
import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import classNames from "classnames";
import s from "./Orders.module.css";
import { colors } from "@/components/constants";
import { Link } from "react-router-dom";

export default function CartItemBig({
  index,
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
      itemPrice(index, product.price * quantity, productId);
    }

    return () => removeItemPrice(productId, index)
  }, [product]);

  useEffect(() => {
    loadItem();
  }, []);

  const handleDelete = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (product) removeItemPrice(productId, index);
    // vymaze item ve vybranem indexu
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    reloadCart();
    window.dispatchEvent(new Event("totalItemsUpdate"));
  };

  const handleQuantity = async (add) => {
    if ((quantity < 30 && add) || (quantity > 1 && !add)) {
      const newQuantity = add ? quantity + 1 : quantity - 1;
      setQuantity(newQuantity);
      const updatedCartItem = JSON.parse(localStorage.getItem("cart")).map(
        (item, ind) => {
          if (ind === index) {
            return {
              productId: item.productId,
              quantity: newQuantity,
              color: item.color,
            };
          }
          return item;
        }
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartItem));
      itemPrice(index, product.price * newQuantity, productId);
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
            <Link to={`/product/${productId}`}>
              <img
                src={`${product.imagePath}front_${colors[color]}.avif`}
                alt={product.name}
                className="w-20 my-2 aspect-square object-contain object-center"
                draggable="false"
              />
            </Link>
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
              onClick={() => handleQuantity(false)}
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
              onClick={() => handleQuantity(true)}
            />
          </div>
          <div>{product.price * quantity} Kč</div>
        </div>
      </div>
    </>
  );
}
