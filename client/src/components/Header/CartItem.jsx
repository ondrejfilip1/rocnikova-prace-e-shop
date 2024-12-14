import { getProductById } from "@/models/Product";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteItem } from "@/models/Cart";

export default function CartItem({ productId, quantity, itemId }) {
  const [product, setProducts] = useState();
  const [isLoaded, setLoaded] = useState();

  const load = async () => {
    const data = await getProductById(productId);
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setProducts(data.payload);
      //console.log(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    const data = await deleteItem(itemId);
  };

  if (!isLoaded) {
    return (
      <>
        <div></div>
      </>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div className="mx-1">
        <div>{product.name}</div>
        <div>
          {quantity}{" "}
          {quantity == 1
            ? "kus"
            : quantity >= 2 && quantity <= 4
            ? "kusy"
            : "kusů"}
        </div>
      </div>
      <Trash2 className="cursor-pointer p-1 background-button-hover inline-block m-1 rounded-md" onClick={handleDelete} />
    </div>
  );
}
