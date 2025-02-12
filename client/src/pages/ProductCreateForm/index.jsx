import { Link, useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import { createProduct } from "../../models/Product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { colorList, colorsTranslated } from "@/components/constants";
import { ChevronLeft } from "lucide-react";

export default function ProductCreateForm() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const product = await createProduct(formData);
    if (product.status === 201) {
      return navigate();
    }
    setInfo(product.message);
  };

  const handleChange = (e) => {
    if (e.target.type == "checkbox") {
      setSelectedColors([...selectedColors, e.target.value]);
      console.log(selectedColors);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  return (
    <>
      <div className="container px-2 mx-auto">
        <h1 className="my-3 text-2xl">Vytvořit produkt</h1>
        <form className="flex flex-col gap-2">
          <Input
            type="text"
            name="name"
            required
            placeholder="Zadejte name"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="brand"
            required
            placeholder="Zadejte brand"
            onChange={handleChange}
          />
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
          <Input
            type="number"
            name="price"
            required
            placeholder="Zadejte price"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="category"
            required
            placeholder="Zadejte category"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="imagePath"
            required
            placeholder="Zadejte imagePath"
            onChange={handleChange}
          />
          <Button variant="secondary" onClick={handlePost} className="w-fit">
            <span>Přidat produkt</span>
          </Button>
        </form>
        <div className="flex flex-col gap-2">
          <p>{info}</p>
          <Link to={"/admin"}>
            <Button variant="secondary" className="gap-1 pl-3">
              <ChevronLeft />
              <span>Jít zpět</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
