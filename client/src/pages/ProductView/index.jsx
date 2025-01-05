import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../models/Product";
import { useState, useEffect } from "react";
import s from "./ProductView.module.css";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import NotFound from "@/components/NotFound";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { addItem } from "@/models/Cart";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import classNames from "classnames";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState();

  const load = async () => {
    const data = await getProductById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setProduct(data.payload);
      //console.log(data.payload);
      handleColorChange(data.payload.color[0]);
      setLoaded(true);
    }
  };

  const handleAddItemsToCart = async (productId) => {
    // TODO: kvantita
    const quantity = 1;
    const data = await addItem({ productId, quantity });
    if (data.status === 201) {
      toast("Položka byla přidána do košíku", {
        description: product.name,
        action: {
          label: <X />,
        },
      });
    } else {
      toast("Chyba při přidávání položky", {
        description: data.message,
        action: {
          label: <X />,
        },
      });
    }
  };

  const handleColorChange = (value) => {
    switch (value) {
      case "white":
        setSelectedColor("bílá");
        return;
      case "black":
        setSelectedColor("černá");
        return;
      case "beige":
        setSelectedColor("béžová");
        return;
      case "gray":
        setSelectedColor("šedá");
        return;
      case "brown":
        setSelectedColor("hnědá");
        return;
    }
    return;
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <NotFound />
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

  return (
    <>
      <div className={s.background}>
        <Header />
        <div className="header-placeholder" />
        <div className="container mx-auto text-red-900 flex gap-5 md:gap-10 p-4">
          <div className="w-1/2">
            <div
              draggable="false"
              className="rounded-lg backdrop-background-color backdrop-blur-xl aspect-square shadow-2xl p-5 flex items-center justify-center"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={product.imagePath}
                    alt=""
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    width={500}
                    height={100}
                  />
                </DialogTrigger>
                <DialogTitle />
                <DialogContent className="border-0 bg-white px-10 max-w-[90%]">
                  <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-white">
                    <img
                      src={product.imagePath}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="text-lg">{product.name}</h1>
            <p className="text-sm">{product.price} Kč</p>
            <p className="text-sm">Značka: {product.brand}</p>
            <div className="text-sm">
              Barva: {selectedColor}
              <RadioGroup
                defaultValue={product.color?.[0]}
                className="my-2 flex"
                onValueChange={(value) => handleColorChange(value)}
              >
                {product.color?.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={color}
                      id={`r${index}`}
                      className={classNames(
                        color === "white" && s.color_white_svg,
                        color === "black" && s.color_black_svg,
                        color === "gray" && s.color_gray_svg,
                        color === "brown" && s.color_brown_svg,
                        color === "beige" && s.color_beige_svg,
                        s.radio_svg_fix
                      )}
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col">
              <Button
                className="bg-red-900 hover:bg-red-950 text-white font-semibold w-full xl:w-1/2 mb-2"
                onClick={() => handleAddItemsToCart(product._id)}
              >
                Přidat do košíku
              </Button>
              <Link to="/view-products">
                <Button
                  className="background-button-hover !text-red-900 gap-1 pl-3"
                  variant="ghost"
                >
                  <ChevronLeft />
                  <div>Zpět k nákupu</div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Toaster
          position="bottom-right"
          className="font-manrope"
          toastOptions={{
            unstyled: false,
            classNames: {
              toast: "background-primary-light border-red-900/20",
              title: "text-red-900",
              description: "text-red-900",
              actionButton:
                "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
              cancelButton:
                "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
              closeButton:
                "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
            },
          }}
        />
      </div>
    </>
  );
}
