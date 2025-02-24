import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { updateProduct, getProductById } from "../../../models/Product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { colorList, colorsTranslated } from "@/components/constants";
import { ChevronLeft, KeyRound } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import ProductLink from "../../Favourites/ProductLink";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProductUpdateForm() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState();
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
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
    }
  };

  const updateForm = async () => {
    const data = await updateProduct(id, formData);
    if (data.status === 200) return navigate(`/product/${id}`);
    setInfo(data.message);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, password: localStorage.getItem("adminPassword") });
    console.log(formData);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateForm();
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <div className="container px-2 mx-auto">
          <p>Product nenalezen</p>
        </div>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <div className="container px-2 mx-auto">
          <p>Product se načítá...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Dialog open={!hasPassword}>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
          <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><KeyRound />Přihlášení</DialogTitle>
            <DialogDescription>
              Nemáte nastavené heslo na admin panel
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link to="/admin">
              <Button
                type="submit"
                className="transition-all"
              >
                Zpět na admin panel
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="container px-2 mx-auto">
        <h1 className="my-3 text-2xl">Upravit produkt</h1>
        <form className="flex flex-col gap-2">
          <Input
            type="text"
            name="name"
            value={product.name}
            required
            placeholder="Zadejte name"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="brand"
            value={product.brand}
            required
            placeholder="Zadejte brand"
            onChange={handleChange}
          />
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
          <Input
            type="number"
            name="price"
            value={product.price}
            required
            placeholder="Zadejte price"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="category"
            value={product.category}
            required
            placeholder="Zadejte category"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="imagePath"
            value={product.imagePath}
            required
            placeholder="Zadejte imagePath"
            onChange={handleChange}
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
