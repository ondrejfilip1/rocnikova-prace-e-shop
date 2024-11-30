import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import s from "./ProductList.module.css";
import classNames from "classnames";

export default function ProductLink(props) {
  return (
    <>
      <Card className={classNames("w-[350px]", s.card_background)}>
        <CardContent className="text-red-900">
          <Link to={`/product/${props._id}`}>
            <img
              src={props.imagePath}
              alt={props.name}
              className="rounded-md border border-transparent my-6"
            />
          </Link>
          <p>{props.name}</p>
          <p>{props.price} Kč</p>
          <RadioGroup defaultValue={props.color?.[0]} className="my-4">
            <p>Barvy:</p>
            {props.color?.map((color, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={color} id={`r${index}`} />
                <Label htmlFor={`r${index}`}>{color}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Přidat do košíku</Button>
        </CardFooter>
      </Card>
    </>
  );
}
