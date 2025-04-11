import { Link, useNavigate } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import { createProduct } from "../../../models/Product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { colorList, colorsTranslated } from "@/components/constants";
import { ChevronLeft, X } from "lucide-react";
import DialogWarning from "../dialogwarning";

export default function ProductCreateForm() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [formData, setFormData] = useState();
  const [status, setStatus] = useState("");
  const [hasPassword, setHasPassword] = useState(
    localStorage.getItem("adminPassword")
  );
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [fillImagePath, setFillImagePath] = useState("");

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
        setFormData({
          ...formData,
          [e.target.name]: copy,
          password: localStorage.getItem("adminPassword"),
        });
        return copy;
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        password: localStorage.getItem("adminPassword"),
      });
    }
    //console.log(formData);
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  useEffect(() => {
    // divam se jestli uz jsem zadal brand a category, abych mohl zviditelnit tlacitko "doplnit"
    if (
      formData &&
      formData.hasOwnProperty("brand") &&
      formData["brand"] != "" &&
      formData.hasOwnProperty("category") &&
      formData["category"] != ""
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  useEffect(() => {
    setFormData({
      password: localStorage.getItem("adminPassword"),
    });
    document.title = "Pigress - Admin panel";
  }, []);

  return (
    <>
      <DialogWarning pass={hasPassword} />
      <div className="container px-2 mx-auto">
        <div className="flex justify-between items-center my-3">
          <h1 className="text-2xl">Vytvořit produkt</h1>
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
            required
            placeholder="Zadejte jméno"
            onChange={handleChange}
          />
          <Label className="text-xs text-neutral-500">Značka</Label>
          <Input
            type="text"
            name="brand"
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
            required
            placeholder="Zadejte cenu"
            onChange={handleChange}
          />
          <Label className="text-xs text-neutral-500">Kategorie</Label>
          <Input
            type="text"
            name="category"
            required
            placeholder="Zadejte kategorii"
            onChange={handleChange}
          />
          <Label className="text-xs text-neutral-500">Cesta k obrázku</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              name="imagePath"
              required
              placeholder="Zadejte cestu k obrázku"
              onChange={handleChange}
              defaultValue={fillImagePath}
            />
            <Button
              variant="secondary"
              disabled={buttonDisabled ? true : false}
              onClick={() =>
                setFillImagePath(
                  `/public/${formData["category"]}/${formData["brand"]}/`
                )
              }
            >
              Doplnit
            </Button>
          </div>
          <Label className="text-xs text-neutral-500">
            Počet kusů na skladě
          </Label>
          <Input
            type="number"
            name="amount"
            required
            placeholder="Zadejte počet kusů na skladě"
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
