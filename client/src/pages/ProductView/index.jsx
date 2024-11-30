import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteProduct, getProductById } from "../../models/Product";
import { useState, useEffect } from "react";
import s from "./ProductView.module.css";
import Header from "@/components/Header";

export default function CarView() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getProductById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setProduct(data.payload);
      setLoaded(true);
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (product.name === formData) {
      const data = await deleteProduct(id);
      if (data.status === 200) {
        alert("Product deleted successfully!");
        navigate(`/`);
      } else {
        setInfo(data.message);
      }
    } else {
      setInfo("Špatný vstup");
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Product not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Product is loading...</p>
      </>
    )
  }

  return (
    <>
            <div className={s.background}>
          <Header />
          <div className="header-placeholder" />
        <h1>Product view</h1>
        <p>{id}</p>
        <p>Název produktu {product.name}</p>
        <p>Značka: {product.brand}</p>
        <p>Barva: {product.color}</p>
        <p>Cena: {product.price}</p>
        <form>
          <input type="text" placeholder={product.name} onChange={handleChange} />
          <button onClick={handleDelete}>Smazat produkt</button>
        </form>
        <p>{info}</p>
        <Link to={`/update-product/${id}`}>
          <p>Aktualizovat produkt</p>
        </Link>

        <Link to={"/"}>
          <p>Go home</p>
        </Link>
        </div>
    </>
  )
}
