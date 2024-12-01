import { useState, useEffect } from "react";
import { getAllProducts } from "../../models/Product";
import ProductLink from "./ProductLink";
import s from "./ProductList.module.css";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [products, setProducts] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllProducts();
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setProducts(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Products not found</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  if (isLoaded) {
    return (
      <>
        <div className={s.background}>
          <Header />
          <div className="header-placeholder" />
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0"
                >
                  <ProductLink {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
