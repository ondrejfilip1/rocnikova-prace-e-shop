import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import s from "./ProductList.module.css";
import classNames from "classnames";
import { ShoppingCart } from "lucide-react";

export default function ProductLink(props) {
  return (
    <>
      <Card
        className={classNames(
          "w-full border-transparent shadow-none flex flex-col justify-between",
          s.card_background
        )}
      >
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
