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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const [engSelectedColor, setEngSelectedColor] = useState();

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

  const handleAddItemsToCart = async (productId, color) => {
    // TODO: kvantita
    const quantity = 1;
    const data = await addItem({ productId, quantity, color });
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
    setEngSelectedColor(value);
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
        <div className="container mx-auto text-red-900 flex gap-5 md:gap-10 p-4 max-w-screen-xl">
          <div className="w-2/3">
            <div className="rounded-lg backdrop-background-color backdrop-blur-xl aspect-square shadow-2xl p-5 flex items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    // TODO: ostatni barvy
                    src={`${product.imagePath}${
                      selectedColor === "bílá" ? "front_w.avif" : "front_b.avif"
                    }`}
                    alt={product.name}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    draggable="false"
                  />
                </DialogTrigger>
                <DialogTitle />
                <DialogContent className="border-0 bg-white px-10 max-w-[90%]">
                  <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-white">
                    <img
                      src={`${product.imagePath}${
                        selectedColor === "bílá"
                          ? "front_w.avif"
                          : "front_b.avif"
                      }`}
                      alt={product.name}
                      className="h-full w-full object-contain"
                      draggable="false"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full my-4"
            >
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-lg backdrop-background-color backdrop-blur-xl border-transparent shadow-lg">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        className="aspect-square object-contain"
                        src={`${product.imagePath}${
                          selectedColor === "bílá"
                            ? "bottom_w.avif"
                            : "bottom_b.avif"
                        }`}
                        alt={product.name}
                        draggable="false"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-lg backdrop-background-color backdrop-blur-xl border-transparent shadow-lg">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        className="aspect-square object-contain"
                        src={`${product.imagePath}${
                          selectedColor === "bílá" ? "top_w.avif" : "top_b.avif"
                        }`}
                        alt={product.name}
                        draggable="false"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-lg backdrop-background-color backdrop-blur-xl border-transparent shadow-lg">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        className="aspect-square object-contain"
                        src={`${product.imagePath}${
                          selectedColor === "bílá"
                            ? "front_w.avif"
                            : "front_b.avif"
                        }`}
                        alt={product.name}
                        draggable="false"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="top-6 left-2 backdrop-blur-xl hover:text-red-900 border-transparent shadow-md backdrop-background-color-dark backdrop-background-color-hover" />
              <CarouselNext className="top-6 right-2 backdrop-blur-xl hover:text-red-900 border-transparent shadow-md backdrop-background-color-dark backdrop-background-color-hover" />
            </Carousel>
          </div>
          <div className="w-1/2">
          <img src="" alt="" />
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
                className="bg-red-900 hover:bg-red-950 text-white font-semibold w-full mb-2"
                onClick={() => handleAddItemsToCart(product._id, engSelectedColor)}
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
