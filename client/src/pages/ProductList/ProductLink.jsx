import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { X } from "lucide-react";
import s from "./ProductList.module.css";
import classNames from "classnames";
import { ShoppingCart, Heart } from "lucide-react";
import { addItem } from "@/models/Cart";
import { useState, useEffect } from "react";
import { colors, colorsTranslated } from "@/components/constants";
import { addFavourite, deleteFavourite } from "@/models/Favourites";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function ProductLink(props) {
  const [selectedColor, setSelectedColor] = useState(props.color[0]);
  const [heartFill, setHeartFill] = useState(false);
  const [currentId, setCurrentId] = useState();

  const addToCart = async (productId, color) => {
    // TODO: kvantita
    const quantity = 1;
    const data = await addItem({ productId, quantity, color });
    if (data.status === 201) {
      toast("Položka byla přidána do košíku", {
        description: props.name,
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

  const handleFavourite = async (productId, color) => {
    return heartFill ? removeFromFavourite() : addToFavourite(productId, color);
  };

  const addToFavourite = async (productId, color) => {
    const data = await addFavourite({ productId, color });
    if (data.status === 201) {
      setHeartFill(true);
      setCurrentId(data.payload._id);
      toast("Položka byla přidána do oblíbených", {
        description: props.name,
        action: {
          label: <X />,
        },
      });
    } else {
      toast("Chyba při přidávání položky do oblíbených", {
        description: data.message,
        action: {
          label: <X />,
        },
      });
    }
  };

  const removeFromFavourite = async () => {
    const data = await deleteFavourite(currentId);
    if (data.status === 200) {
      setHeartFill(false);
      toast("Položka byla odebrána z oblíbených", {
        description: props.name,
        action: {
          label: <X />,
        },
      });
    } else {
      toast("Chyba při odebírání položky z oblíbených", {
        description: data.message,
        action: {
          label: <X />,
        },
      });
    }
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
      <Card
        className={classNames(
          "w-full h-full border-transparent shadow-none flex flex-col justify-between",
          s.card_background
        )}
      >
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
          <img
            src={`${props.imagePath}front_${colors[selectedColor]}.avif`}
            alt={props.name}
            className="rounded-md border border-transparent my-6 px-6 aspect-video object-contain object-center select-none"
            draggable="false"
          />
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
            <Button
              className={classNames(
                "text-red-900 bg-transparent background-button-hover font-semibold",
                s.cart_button_hover
              )}
              onClick={() => addToCart(props._id, selectedColor)}
            >
              <ShoppingCart />
              Přidat do košíku
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
