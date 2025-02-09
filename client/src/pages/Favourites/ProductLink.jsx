import { Link } from "react-router-dom";
import { getProductById } from "@/models/Product";
import { useEffect, useState } from "react";
import { colors, colorsTranslated } from "@/components/constants";

export default function ProductLink(props) {
  const [product, setProduct] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const loadProduct = async () => {
    const data = await getProductById(props.productId);
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setProduct(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <Link to={`/product/${props.productId}`} className="h-full max-h-[90%]">
          <img
            src={`${product.imagePath}front_${colors[props.color]}.avif`}
            className="object-contain object-center h-full p-4"
            draggable="false"
          />
        </Link>
        <div className="top-4 absolute text-center">{colorsTranslated[props.color]}</div>
        <div className="absolute bottom-4 font-medium lg:text-lg text-base text-center">{product.name}</div>
      </div>
    </>
  );
}
