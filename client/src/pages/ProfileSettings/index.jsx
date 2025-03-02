import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Save, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function ProfileSettings() {
  const [formData, setFormData] = useState();
  const [hasSettings, setHasSettings] = useState(
    localStorage.getItem("profileSettings")
  );

  useEffect(() => {
    document.title = "Pigress - Nastavení účtu";
    if (hasSettings)
      setFormData(JSON.parse(localStorage.getItem("profileSettings")));
  }, []);

  const inputStyles = {
    styles:
      "pl-8 border-red-900/10 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent backdrop-background-color backdrop-background-color-hover transition-colors backdrop-blur-md",
    icons: "absolute left-2 top-2 z-1 w-4 pointer-events-none",
    boxes:
      "cursor-pointer w-1/2 sm:w-full h-auto gap-1 select-none text-center px-8 py-4 flex flex-col justify-center items-center border border-red-900/10 bg-transparent backdrop-background-color backdrop-background-color-hover transition-colors backdrop-blur-md rounded-md",
  };

  const handleSave = () => {
    toast("Účet", {
      description: "Změny byly úspěšně uloženy",
      action: {
        label: <X />,
      },
    });
    localStorage.setItem("profileSettings", JSON.stringify(formData));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    //console.log(formData);
  };

  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="mt-3.5" />
        <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
          <span>Nastavení</span>
        </div>
        <div className="container mx-auto px-2 text-red-900">
          <div className="flex w-full items-center gap-5 mb-3">
            <div className="w-full items-center gap-1.5">
              <Label htmlFor="email">Jméno</Label>
              <div className="relative">
                <User className={inputStyles.icons} />
                <Input
                  type="text"
                  id="firstName"
                  className={inputStyles.styles}
                  onChange={handleChange}
                  defaultValue={
                    hasSettings && formData ? formData.firstName : ""
                  }
                />
              </div>
            </div>
            <div className="w-full items-center gap-1.5">
              <Label htmlFor="email">Příjmení</Label>
              <div className="relative">
                <User className={inputStyles.icons} />
                <Input
                  type="text"
                  id="lastName"
                  className={inputStyles.styles}
                  onChange={handleChange}
                  defaultValue={
                    hasSettings && formData ? formData.lastName : ""
                  }
                />
              </div>
            </div>
          </div>
          {/* TODO */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="data-[state=checked]:bg-red-900 border-red-900"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Automaticky vyplnit údaje u platby
            </label>
          </div>
          <div className="flex justify-end">
            <Button
              className="background-button-hover !text-white !bg-red-900 hover:!bg-red-950 gap-1 pl-3"
              variant="ghost"
              onClick={handleSave}
            >
              <Save />
              <div>Uložit změny</div>
            </Button>
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
