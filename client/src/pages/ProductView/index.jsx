import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../models/Product";
import { useState, useEffect } from "react";
import s from "./ProductView.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import NotFound from "@/components/NotFound";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronsUpDown, Check, Heart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
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
import {
  colors,
  colorsTranslated,
  categoriesTranslated,
  sizes,
  shoeSizes,
  brands,
} from "@/components/constants";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const [engSelectedColor, setEngSelectedColor] = useState();
  const [heartFill, setHeartFill] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [favouritesIDs, setFavouritesIDs] = useState();
  const [selectedImage, setSelectedImage] = useState("front");

  // dropdown pro velikosti
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const load = async () => {
    const data = await getProductById(id);
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites && favourites.length > 0) setFavouritesIDs(favourites);
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
    const itemObject = {
      productId: productId,
      quantity: quantity,
      color: color,
    };
    const items = JSON.parse(localStorage.getItem("cart")) || "";
    const newItems = JSON.stringify([...items, itemObject]);
    localStorage.setItem("cart", newItems) || "[]";
    toast("Položka byla přidána do košíku", {
      description: product.name,
      action: {
        label: <X />,
      },
    });
  };

  const handleColorChange = (value) => {
    setEngSelectedColor(value);
    setSelectedColor(colorsTranslated[value]);
    return;
  };

  const handleFavourite = async (productId, color) => {
    return heartFill
      ? removeFromFavourite(productId)
      : addToFavourite(productId, color);
  };

  const addToFavourite = async (productId, color) => {
    const itemObject = {
      productId: productId,
      color: color,
    };
    const items = JSON.parse(localStorage.getItem("favourites")) || "";
    const newItems = JSON.stringify([...items, itemObject]);
    localStorage.setItem("favourites", newItems) || "[]";
    setHeartFill(true);
    setCurrentId(productId);
    toast("Položka byla přidána do oblíbených", {
      description: product.name,
      action: {
        label: <X />,
      },
    });
  };

  const removeFromFavourite = async (productId) => {
    const favourite = JSON.parse(localStorage.getItem("favourites"));

    let indexItem;
    favourite.map((value, index) => {
      if (value.productId === productId) {
        indexItem = index;
      }
    });

    favourite.splice(indexItem, 1);

    localStorage.setItem("favourites", JSON.stringify(favourite));
    setHeartFill(false);
    toast("Položka byla odebrána z oblíbených", {
      description: product.name,
      action: {
        label: <X />,
      },
    });
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (favouritesIDs) {
      favouritesIDs.map((item) => {
        if (item.productId == product._id) {
          setHeartFill(true);
          setCurrentId(item._id);
        }
      });
    }
  }, [favouritesIDs]);

  if (isLoaded === null) {
    return <NotFound />;
  }

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="container mx-auto text-red-900 flex gap-5 md:gap-10 p-4 max-w-screen-xl">
          <div className="w-2/3">
            <div className="rounded-lg backdrop-background-color backdrop-blur-xl aspect-square shadow-2xl p-5 flex items-center justify-center object-cover overflow-hidden">
              <img
                src={`${product.imagePath}${selectedImage}_${colors[engSelectedColor]}.avif`}
                alt={product.name}
                className="h-auto w-full object-contain aspect-square"
                draggable="false"
                /*
                classNameMagnifier="bg-red-100 rounded-md shadow-lg"
                magnifierHeight={150}
                magnifierWidth={150}
                zoomLevel={2}
                styleImg={{ maxHeight: `${maxHeight}px` }}*/
              />
            </div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full my-4"
            >
              <CarouselContent className="pb-6">
                <CarouselItem
                  className="sm:basis-1/2 lg:basis-1/3"
                  onClick={() => setSelectedImage("bottom")}
                >
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
                <CarouselItem
                  className="sm:basis-1/2 lg:basis-1/3"
                  onClick={() => setSelectedImage("top")}
                >
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
                <CarouselItem
                  className="sm:basis-1/2 lg:basis-1/3"
                  onClick={() => setSelectedImage("front")}
                >
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
            <Breadcrumb className="my-1">
              <BreadcrumbList className="text-red-900 hover:!text-red-950 opacity-50 font-medium">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/view-products/${product.category}?category=${product.category}`}
                    className="hover:text-red-950"
                  >
                    {categoriesTranslated[product.category]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/view-products/${product.category}?category=${product.category}&search=${product.name}`}
                    className="hover:text-red-950"
                  >
                    {product.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-1">
              <img
                src={`/src/assets/icons/${brands[product.brand]}`}
                alt={product.brand}
                className="w-24 max-h-12 object-left object-contain h-auto"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Heart
                      className={
                        "bg-transparent background-button-hover transition-all inline-block text-red-900 p-1 m-1 rounded-md cursor-pointer " +
                        (heartFill ? "fill-red-900" : "fill-transparent")
                      }
                      onClick={() =>
                        handleFavourite(product._id, engSelectedColor)
                      }
                      size={28}
                      strokeWidth={1.75}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="text-sm background-primary-light text-red-900 outline-none border-none"
                    side="bottom"
                  >
                    <p>
                      {heartFill
                        ? "Odebrat z oblíbených"
                        : "Přidat do oblíbených"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
                        <TooltipTrigger asChild>
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
                              color === "red" && "color_red_svg",
                              color === "purple" && "color_purple_svg",
                              color === "light_blue" && "color_light_blue_svg",
                              color === "blue" && "color_blue_svg",
                              color === "green" && "color_green_svg",
                              color === "pastel_yellow" &&
                                "color_pastel_yellow_svg",
                              "radio_svg_fix",
                              s.radio_ring,
                              "rounded-full border-none ring-1 ring-red-900/25"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          className="text-sm background-primary-light text-red-900 outline-none border-none mr-4"
                          side="bottom"
                        >
                          <p>{colorsTranslated[color]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between hover:text-red-900 backdrop-background-color border-red-900/10 backdrop-background-color-hover mb-2"
                  >
                    {value
                      ? (product.category == "boty" ? shoeSizes : sizes).find(
                          (size) => size.value === value
                        )?.label
                      : "Vybrat velikost..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command className="!backdrop-background-color">
                    <CommandInput
                      placeholder="Vybrat velikost..."
                      className="h-9 placeholder:text-red-900"
                    />
                    <CommandList>
                      <CommandEmpty>Velikost není k dispozici</CommandEmpty>
                      <CommandGroup>
                        {(product.category == "boty" ? shoeSizes : sizes).map(
                          (size) => (
                            <CommandItem
                              key={size.value}
                              value={size.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                              className="backdrop-background-color-hover text-red-900 hover:!text-red-900"
                            >
                              {size.label}
                              <Check
                                className={classNames(
                                  "ml-auto",
                                  value === size.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button
                className="bg-red-900 hover:bg-red-950 text-white font-semibold w-full mb-2"
                onClick={() =>
                  handleAddItemsToCart(product._id, engSelectedColor)
                }
              >
                Přidat do košíku
              </Button>
              <Link
                to={`/view-products/${product.category}?category=${product.category}`}
              >
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
