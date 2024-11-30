import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../models/Product";
import ProductLink from "./ProductLink";
import s from "./ProductList.module.css";
import Header from "@/components/Header";

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
        <p>Loading...</p>
      </>
    );
  }

  if (isLoaded) {
    return (
      <>
        <div className={s.background}>
          <Header />
          <div className="header-placeholder" />
          {products.map((product, index) => (
            <ProductLink key={index} {...product} />
          ))}
        </div>
      </>
    );
  }
}
