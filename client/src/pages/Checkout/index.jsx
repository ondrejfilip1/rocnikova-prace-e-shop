import Header from "@/components/Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone } from "lucide-react";
import classNames from "classnames";

export default function Checkout() {
  const inputStyles = {
    styles:
      "pl-8 border-transparent shadow-md focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent backdrop-background-color backdrop-background-color-hover transition-colors backdrop-blur-md",
    icons: "absolute left-2 top-2 z-1 w-4 pointer-events-none",
  };

  return (
    <>
      <div className="background">
        <Header />
        <div className="header-placeholder" />
        <div className="text-red-900 text-sm container mx-auto px-4 lg:max-w-screen-lg font-medium my-2 flex flex-col justify-center">
          <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6 mt-2">
            <span>Platba</span>
          </div>
          <form>
            <div className="flex w-full items-center gap-2.5 mb-1.5">
              <div className="w-full items-center gap-1.5">
                <Label htmlFor="email">Jméno</Label>
                <div className="relative">
                  <User className={inputStyles.icons} />
                  <Input
                    type="text"
                    id="firstName"
                    className={inputStyles.styles}
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
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center gap-2.5 mb-1.5">
              <div className="w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className={inputStyles.icons} />
                  <Input
                    type="email"
                    id="email"
                    className={inputStyles.styles}
                  />
                </div>
              </div>
              <div className="w-full items-center gap-1.5">
                <Label htmlFor="email">Telefonní číslo</Label>
                <div className="relative">
                  <Phone className={inputStyles.icons} />
                  <Input
                    type="number"
                    id="email"
                    className={inputStyles.styles}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
