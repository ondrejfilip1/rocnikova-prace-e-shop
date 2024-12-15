import { getProductById } from "@/models/Product";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteItem } from "@/models/Cart";

export default function CartItemBig({
  productId,
  quantity,
  itemId,
  reloadCart,
}) {
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
    <>
        <div className="flex justify-between items-center">
          <div>
            <div className="h-20 flex items-center">
            <img
              src={product.imagePath}
              alt={product.name}
              className="w-20 my-2"
              draggable="false"
            /></div>
            <div>
              <div className="font-semibold">{product.name}</div>
              <div className="text-base">
                {product.price} Kč
              </div>
              <div className="text-base">
                {quantity}x
              </div>
            </div>
          </div>
          <Trash2
            className="cursor-pointer p-3 background-button-hover min-h-12 min-w-12 inline-block rounded-md transition-colors"
            size={24}
            onClick={handleDelete}
          />
        </div>
    </>
  );
}
