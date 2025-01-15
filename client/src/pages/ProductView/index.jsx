import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../models/Product";
import { useState, useEffect } from "react";
import s from "./ProductView.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
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
import { colors, colorsTranslated } from "@/components/constants";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const [engSelectedColor, setEngSelectedColor] = useState();

  const brands = {
    adidas: "adidas.svg",
    nike: "nike.svg",
    vans: "vans.svg",
    jordan: "jordan.svg",
    puma: "puma.svg",
    reebok: "reebok.svg",
    skechers: "skechers.svg",
    tommy_hilfiger: "tommy_hilfiger.svg",
  };

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
      case "olive":
        setSelectedColor("olivová");
        return;
      case "sea_blue":
        setSelectedColor("mořská modř");
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
      <div className="background pb-[1px]">
        <Header />
        <div className="header-placeholder" />
        <div className="container mx-auto text-red-900 flex gap-5 md:gap-10 p-4 max-w-screen-xl">
          <div className="w-2/3">
            <div className="rounded-lg backdrop-background-color backdrop-blur-xl aspect-square shadow-2xl p-5 flex items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={`${product.imagePath}front_${colors[engSelectedColor]}.avif`}
                    alt={product.name}
                    className="h-auto w-full cursor-zoom-in"
                    draggable="false"
                  />
                </DialogTrigger>
                <DialogTitle />
                <DialogContent className="border-0 bg-white px-10 max-w-[90%]">
                  <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-white">
                    <img
                      src={`${product.imagePath}front_${colors[engSelectedColor]}.avif`}
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
              <CarouselContent className="pb-6">
                <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-lg backdrop-background-color backdrop-blur-xl border-transparent shadow-lg">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        className="aspect-square object-contain"
                        src={`${product.imagePath}bottom_${colors[engSelectedColor]}.avif`}
                        alt={product.name}
                        draggable="false"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-lg backdrop-background-color backdrop-blur-xl border-transparent shadow-lg">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        className="aspect-square object-contain"
                        src={`${product.imagePath}top_${colors[engSelectedColor]}.avif`}
                        alt={product.name}
                        draggable="false"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                  <Card className="rounded-lg backdrop-background-color backdrop-blur-xl border-transparent shadow-lg">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        className="aspect-square object-contain"
                        src={`${product.imagePath}front_${colors[engSelectedColor]}.avif`}
                        alt={product.name}
                        draggable="false"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="top-6 left-2 backdrop-blur-sm hover:text-red-900 border-transparent shadow-md backdrop-background-color-dark backdrop-background-color-hover" />
              <CarouselNext className="top-6 right-2 backdrop-blur-sm hover:text-red-900 border-transparent shadow-md backdrop-background-color-dark backdrop-background-color-hover" />
            </Carousel>
          </div>
          <div className="w-1/2">
            <img
              src={`/src/assets/icons/${brands[product.brand]}`}
              alt={product.brand}
              className="w-12 h-auto mb-1"
            />
            <h1 className="text-lg font-medium">{product.name}</h1>
            <p className="text-sm font-medium">{product.price} Kč</p>
            <div className="text-sm font-medium">
              Barva: {selectedColor}
              <RadioGroup
                defaultValue={product.color?.[0]}
                className="my-2 flex"
                onValueChange={(value) => handleColorChange(value)}
              >
                {product.color?.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <RadioGroupItem
                            value={color}
                            id={`r${index}`}
                            className={classNames(
                              color === "white" && "color_white_svg",
                              color === "black" && "color_black_svg",
                              color === "gray" && "color_gray_svg",
                              color === "brown" && "color_brown_svg",
                              color === "beige" && "color_beige_svg",
                              color === "olive" && "color_olive_svg",
                              color === "sea_blue" && "color_sea_blue_svg",
                              "radio_svg_fix", s.radio_ring,
                              "rounded-full border-none ring-1 ring-red-900/25"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="text-sm background-primary-light text-red-900 outline-none border-none mr-4" side="bottom">
                          <p>{colorsTranslated[color]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col">
              <Button
                className="bg-red-900 hover:bg-red-950 text-white font-semibold w-full mb-2"
                onClick={() =>
                  handleAddItemsToCart(product._id, engSelectedColor)
                }
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
                <Footer />
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
