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

export default function ProductLink(props) {
  const handleAddItemsToCart = async (productId) => {
    // TODO: kvantita
    const quantity = 3;
    const data = await addItem({ productId, quantity });
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

  return (
    <>
      <Card
        className={classNames(
          "w-full h-full border-transparent shadow-none flex flex-col justify-between",
          s.card_background
        )}
      >
        <Heart
          className="bg-transparent background-button-hover transition-colors inline-block text-red-900 p-1 m-1 rounded-md absolute cursor-pointer"
          onClick={() =>
            toast("Položka byla přidána do oblíbených", {
              description: props.name,
              action: {
                label: <X />,
              },
            })
          }
          size={28}
          strokeWidth={1.75}
        />
        <Link to={`/product/${props._id}`} className={s.image_fix}>
          <img
            src={props.imagePath}
            alt={props.name}
            className="rounded-md border border-transparent my-6 px-6"
            draggable="false"
          />
        </Link>
        <div>
          <CardContent className="text-red-900 text-center flex justify-center flex-col px-6 py-0">
            <p>{props.name}</p>
            <p>{props.price} Kč</p>
            <RadioGroup
              defaultValue={props.color?.[0]}
              className="my-4 flex justify-center"
            >
              {props.color?.map((color, index) => (
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
          </CardContent>
          <CardFooter className="flex justify-center text-center">
            <Button
              className={classNames(
                "text-red-900 bg-transparent background-button-hover font-semibold",
                s.cart_button_hover
              )}
              onClick={() => handleAddItemsToCart(props._id)}
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
