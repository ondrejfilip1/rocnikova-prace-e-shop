import { getProductById } from "@/models/Product";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { motion } from "motion/react";

export default function CartItem({ cartItems, index, reloadCart }) {
  const [product, setProducts] = useState();
  const [isLoaded, setLoaded] = useState();

  const loadItem = async () => {
    //console.log(props.cartItems.productId);
    const data = await getProductById(cartItems.productId);
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setProducts(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadItem();
  }, []);

  const handleDelete = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // vymaze item ve vybranem indexu
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    reloadCart();
  };

  if (!isLoaded) {
    return (
      <>
        {/* placeholder */}
        <div className="h-[40px] rounded-md ml-1 mr-3 w-[344px] flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: .9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex justify-between items-center"
    >
      <div className="mx-1">
        <div className="font-semibold">{product.name}</div>
        <div>
          {cartItems.quantity}{" "}
          {cartItems.quantity == 1
            ? "kus"
            : cartItems.quantity >= 2 && cartItems.quantity <= 4
            ? "kusy"
            : "kusů"}
        </div>
      </div>
      <Trash2
        className="cursor-pointer p-1 background-button-hover min-h-6 min-w-6 inline-block mx-3 rounded-md transition-colors"
        size={24}
        onClick={handleDelete}
      />
    </motion.div>
  );
}
