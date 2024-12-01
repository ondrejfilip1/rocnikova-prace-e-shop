import { SidebarMenuItem } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

const checkboxBrands = [
  {
    id: "adidas",
    label: "Adidas",
  },
  {
    id: "nike",
    label: "Nike",
  },
  {
    id: "vans",
    label: "Vans",
  },
  {
    id: "jordan",
    label: "Jordan",
  },
  {
    id: "reebok",
    label: "Reebok",
  },
  {
    id: "tommy_hilfiger",
    label: "Tommy Hilfiger",
  },
  {
    id: "puma",
    label: "Puma",
  },
  {
    id: "skechers",
    label: "Skechers",
  },
];

export default function Filters() {
  const [sliderValue, setSliderValue] = useState([1000, 10000]);

  const methods = useForm({
    defaultValues: {
      items: [],
    },
  });

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const onSubmit = (data) => {
    if (data && data.length !== 0) 
    // to do
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SidebarMenuItem className="flex flex-col gap-2 mx-2">
          <span>Cena</span>
          <Slider
            defaultValue={[1000, 10000]}
            max={10000}
            step={1}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between">
            <span>{sliderValue[0]} Kč</span>
            <span>{sliderValue[1]} Kč</span>
          </div>
        </SidebarMenuItem>
        <Separator className="!bg-red-900/20 my-2" />
        <SidebarMenuItem className="flex flex-col gap-2 mx-2">
          <span>Značky</span>
          {checkboxBrands.map((item) => (
            <Controller
              key={item.id}
              name="items"
              render={({ field }) => (
                <div className="flex flex-row items-center space-x-3 space-y-0">
                  <Checkbox
                    className="border-red-900 text-red-900 data-[state=checked]:bg-red-900"
                    checked={field.value?.includes(item.id)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item.id])
                        : field.onChange(
                            field.value?.filter((value) => value !== item.id)
                          );
                    }}
                  />
                  <label>{item.label}</label>
                </div>
              )}
            />
          ))}
          <Button type="submit" className="bg-red-900 hover:bg-red-950">Filtrovat</Button>
        </SidebarMenuItem>
        <Separator />
      </form>
    </FormProvider>
  );
}
