import { Link, useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import { createProduct } from "../../../models/Product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { colorList, colorsTranslated } from "@/components/constants";
import { ChevronLeft, X, KeyRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProductCreateForm() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
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

  const postForm = async () => {
    const product = await createProduct(formData);
    if (product.status === 201) {
      setStatus("success");
      toast("Produkt úspěšně vytvořen", {
        description: product.payload.name,
        action: {
          label: <X />,
        },
      });
      return navigate();
    } else {
      setStatus("error");
      toast("Chyba " + product.status + " při vytváření produktu", {
        description: product.message,
        action: {
          label: <X />,
        },
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.type == "checkbox") {
      setSelectedColors((prev) => {
        let copy = [...prev];
        if (e.target.checked) {
          copy.push(e.target.value);
          //console.log("pridalo se " + e.target.value);
        } else {
          // dekuju chlape: https://dev.to/urielbitton/react-tricks-miniseries-3-how-to-remove-element-from-usestate-array-13h1
          //console.log("odebralo se " + e.target.value);
          copy = copy.filter((colorValue) => colorValue !== e.target.value);
        }
        setFormData({ ...formData, [e.target.name]: copy, password: localStorage.getItem("adminPassword") });
        return copy;
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value, password: localStorage.getItem("adminPassword") });
    }
    //console.log(formData);
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

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
        <h1 className="my-3 text-2xl">Vytvořit produkt</h1>
        <form className="flex flex-col gap-2">
          <Input
            type="text"
            name="name"
            required
            placeholder="Zadejte name"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="brand"
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
            required
            placeholder="Zadejte price"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="category"
            required
            placeholder="Zadejte category"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="imagePath"
            required
            placeholder="Zadejte imagePath"
            onChange={handleChange}
          />
          <Button
            variant="secondary"
            onClick={handlePost}
            className="w-fit mb-2"
          >
            <span>Přidat produkt</span>
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
