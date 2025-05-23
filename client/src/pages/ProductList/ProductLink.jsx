import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { X } from "lucide-react";
import s from "./ProductList.module.css";
import classNames from "classnames";
import { ShoppingCart, Heart, Check } from "lucide-react";
import { useState, useEffect } from "react";
import {
  colors,
  colorsTranslated,
  shoeSizes,
  sizes,
} from "@/components/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function ProductLink(props) {
  const [selectedColor, setSelectedColor] = useState(props.color[0]);
  const [heartFill, setHeartFill] = useState(false);
  const [currentId, setCurrentId] = useState();

  // dropdown pro velikosti
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const addToCart = async (productId, color, size) => {
    // TODO: kvantita
    const quantity = 1;
    const itemObject = {
      productId: productId,
      quantity: quantity,
      color: color,
      selectedSize: size,
    };
    const items = JSON.parse(localStorage.getItem("cart")) || "";
    
    // loop, kouka se jestli nemame duplikaty, jestli jo tak se jen pricte mnozstvi u toho danyho produktu
    let duplicate = false;
    for (let i = 0; i < items.length; i++) {
      if (
        productId === items[i].productId &&
        color === items[i].color &&
        size === items[i].selectedSize
      ) {
        // kdyz duplikat
        if (items[i].quantity + 1 > props.amount)
          return toast("Více položek přidat nemůžete", {
            action: {
              label: <X />,
            },
          });

        items[i].quantity++;
        const newItems = JSON.stringify(items);
        localStorage.setItem("cart", newItems) || "[]";
        duplicate = true;
      } else if (i === items.length - 1) {
        // neni duplikat
        break;
      }
    }
    // jestli neni duplikat tak muzu normalne pridat dalsi polozku
    if (!duplicate) {
      const newItems = JSON.stringify([...items, itemObject]);
      localStorage.setItem("cart", newItems) || "[]";
    }
    toast("Položka byla přidána do košíku", {
      description: props.name,
      action: {
        label: <X />,
      },
    });
    window.dispatchEvent(new Event("totalItemsUpdate"));
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
      description: props.name,
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
      description: props.name,
      action: {
        label: <X />,
      },
    });
  };

  useEffect(() => {
    if (props.favouritesIDs) {
      props.favouritesIDs.map((item) => {
        if (item.productId == props._id) {
          setHeartFill(true);
          setCurrentId(item._id);
        }
      });
    }
  }, []);

  // fix na bug s defaultni hodnotou
  useEffect(() => {
    setSelectedColor(props.color[0]);
  }, [props.color]);

  return (
    <>
      <Card className="w-full h-full border-transparent shadow-none flex flex-col justify-between card_background">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Heart
                className={
                  "bg-transparent background-button-hover transition-all inline-block text-red-900 p-1 m-1 rounded-md absolute cursor-pointer " +
                  (heartFill ? "fill-red-900" : "fill-transparent")
                }
                onClick={() => handleFavourite(props._id, selectedColor)}
                size={28}
                strokeWidth={1.75}
              />
            </TooltipTrigger>
            <TooltipContent
              className="text-sm background-primary-light text-red-900 outline-none border-none"
              side="bottom"
            >
              <p>
                {heartFill ? "Odebrat z oblíbených" : "Přidat do oblíbených"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link to={`/product/${props._id}`} className={s.image_fix}>
          <div className="relative w-full aspect-video my-6">
            <img
              src={`${props.imagePath}front_${colors[selectedColor]}.avif`}
              alt={props.name}
              className="absolute inset-0 w-full px-6 h-full object-contain object-center select-none img_highlight"
              draggable="false"
            />
          </div>
        </Link>
        <div>
          <CardContent className="text-red-900 text-center flex justify-center flex-col px-6 py-0">
            <p className="font-medium">{props.name}</p>
            <p>{props.price} Kč</p>
            <RadioGroup
              value={selectedColor}
              onValueChange={setSelectedColor}
              className="my-4 flex justify-center"
            >
              {props.color?.map((color, index) => (
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
                              color === "pink" && "color_pink_svg",
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
          </CardContent>
          <CardFooter className="flex justify-center text-center">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button className="text-red-900 bg-transparent background-button-hover font-semibold hover:scale-105 transition-all">
                  <ShoppingCart />
                  Přidat do košíku
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
                      {(props.category == "boty" ? shoeSizes : sizes).map(
                        (size) => (
                          <CommandItem
                            key={size.value}
                            value={size.value}
                            onSelect={(currentValue) => {
                              setSelectedSize(
                                currentValue === selectedSize
                                  ? ""
                                  : currentValue
                              );
                              setOpen(false);
                              addToCart(props._id, selectedColor, currentValue);
                            }}
                            className="backdrop-background-color-hover text-red-900 hover:!text-red-900"
                          >
                            {size.label}
                            <Check
                              className={classNames(
                                "ml-auto",
                                selectedSize === size.value
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
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
