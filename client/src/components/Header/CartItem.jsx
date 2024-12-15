import { getProductById } from "@/models/Product";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteItem } from "@/models/Cart";

export default function CartItem({ productId, quantity, itemId, reloadCart }) {
  const [product, setProducts] = useState();
  const [isLoaded, setLoaded] = useState();

  const loadItem = async () => {
    const data = await getProductById(productId);
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setProducts(data.payload);
      //console.log(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadItem();
  }, []);

  const handleDelete = async () => {
    const data = await deleteItem(itemId);
    if (data.status === 200) {
      reloadCart();
    }
    // TODO: tady by neco melo bejt (if status 404 nebo 500)
  };

  if (!isLoaded) {
    return (
      <>
        {/* nevim co sem dam tak tu je jen prazdny div lol */}
        <div></div>
      </>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div className="mx-1">
        <div className="font-semibold">{product.name}</div>
        <div>
          {quantity}{" "}
          {quantity == 1
            ? "kus"
            : quantity >= 2 && quantity <= 4
            ? "kusy"
            : "kusů"}
        </div>
      </div>
      <Trash2
        className="cursor-pointer p-1 background-button-hover min-h-6 min-w-6 inline-block mx-3 rounded-md transition-colors"
        size={24}
        onClick={handleDelete}
      />
    </div>
  );
}
