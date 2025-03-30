import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { updateProduct, getProductById } from "../../../models/Product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { colorList, colorsTranslated } from "@/components/constants";
import { ChevronLeft, KeyRound } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import DialogWarning from "../dialogwarning";

export default function ProductUpdateForm() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState();
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const [status, setStatus] = useState("");
  const [hasPassword, setHasPassword] = useState(
    localStorage.getItem("adminPassword")
  );
  const navigate = useNavigate();

  const toastStyle = {
    error: "background-primary-light border-red-900/20",
    success: "bg-green-100 border-green-900/20",
  };

  const textStyle = {
    error: "text-red-900",
    success: "text-green-900",
  };

  const buttonStyle = {
    error:
      "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
    success:
      "!text-green-900 !bg-transparent hover:!bg-green-900/10 !p-1 !h-7 !w-7 !transition-colors",
  };

  const load = async () => {
    const data = await getProductById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setProduct(data.payload);
      setLoaded(true);
      setFormData({
        password: localStorage.getItem("adminPassword"),
      });
    }
  };

  const updateForm = async () => {
    const data = await updateProduct(id, formData);
    if (data.status === 200) return navigate(`/product/${id}`);
    else setStatus("error");
    setInfo(data.message);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      password: localStorage.getItem("adminPassword"),
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateForm();
  };

  /*
  // nastavi nahodne cislo poctu kusu na sklade
  const randomNumber = (e) => {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    e.target.value = Math.floor(rand);
    handleChange(e);
  }*/

  useEffect(() => {
    load();
    document.title = "Pigress - Admin panel";
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <div className="text-center h-screen flex justify-center items-center text-lg">
          Produkt nenalezen
        </div>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <div className="text-center h-screen flex justify-center items-center text-lg">
          Produkt se načítá...
        </div>
      </>
    );
  }

  return (
    <>
      <DialogWarning pass={hasPassword} />
      <div className="container px-2 mx-auto">
        <div className="flex justify-between items-center my-3">
          <h1 className="text-2xl">Upravit produkt</h1>
          <Link to={"/admin"}>
            <Button variant="outline" className="gap-1 pl-3">
              <ChevronLeft />
              <span>Jít zpět</span>
            </Button>
          </Link>
        </div>
        <form className="flex flex-col gap-2">
          <Label className="text-xs text-neutral-500">Jméno</Label>
          <Input
            type="text"
            name="name"
            defaultValue={product.name}
            required
            placeholder="Zadejte jméno"
            onChange={handleChange}
          />
          <Label className="text-xs text-neutral-500">Značka</Label>
          <Input
            type="text"
            name="brand"
            defaultValue={product.brand}
            required
            placeholder="Zadejte značku"
            onChange={handleChange}
          />
          <Label className="text-xs text-neutral-500">Barvy</Label>
          {colorList.map((color, index) => (
            <Fragment key={index}>
              <div className="flex gap-2 items-center">
                <Input
                  type="checkbox"
                  className="w-4 h-4"
                  id={`terms${index}`}
                  name="color"
                  value={color}
                  onChange={handleChange}
                  defaultChecked={
                    Object.values(product.color).includes(color) ? true : false
                  }
                />
                <label
                  htmlFor={`terms${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {colorsTranslated[color]}
                </label>
              </div>
            </Fragment>
          ))}
          <Label className="text-xs text-neutral-500">Cena</Label>
          <Input
            type="number"
            name="price"
            defaultValue={product.price}
            required
            placeholder="Zadejte cenu"
            onChange={handleChange}
          />
          <Label className="text-xs text-neutral-500">Kategorie</Label>
          <Input
            type="text"
            name="category"
            defaultValue={product.category}
            required
            placeholder="Zadejte kategorii"
            onChange={handleChange}
          />
          <Label className="text-xs text-neutral-500">Cesta k obrázku</Label>
          <Input
            type="text"
            name="imagePath"
            defaultValue={product.imagePath}
            required
            placeholder="Zadejte cestu k obrázku"
            onChange={handleChange}
          />
          <Label className="text-xs text-neutral-500">
            Počet kusů na skladě
          </Label>
          <Input
            type="number"
            name="amount"
            required
            placeholder="Zadejte počet kusů na skladě"
            defaultValue={product.amount}
            onChange={handleChange}
            //onClick={randomNumber}
          />
          <Button
            variant="secondary"
            onClick={handleUpdate}
            className="w-fit mb-2"
          >
            <span>Upravit produkt</span>
          </Button>
        </form>
        <div className="flex flex-col gap-2">
          <Link to={"/admin"}>
            <Button variant="secondary" className="gap-1 pl-3">
              <ChevronLeft />
              <span>Jít zpět</span>
            </Button>
          </Link>
          <p>{info}</p>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        className="font-manrope"
        toastOptions={{
          unstyled: false,
          classNames: {
            toast: toastStyle[status],
            title: textStyle[status],
            description: textStyle[status],
            actionButton: buttonStyle[status],
            cancelButton: buttonStyle[status],
            closeButton: buttonStyle[status],
          },
        }}
      />
    </>
  );
}
