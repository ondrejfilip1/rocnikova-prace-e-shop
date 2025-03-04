import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Phone,
  House,
  Building2,
  Truck,
  CreditCard,
  QrCode,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function Checkout() {
  // TODO: platebni metody
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

  const selectPM = (number) => {
    setSelectedPaymentMethod(number);
    console.log(number);
  };

  const inputStyles = {
    styles:
      "pl-8 border-red-900/10 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent backdrop-background-color backdrop-background-color-hover transition-colors backdrop-blur-md",
    icons: "absolute left-2 top-2 z-1 w-4 pointer-events-none",
    boxes:
      "cursor-pointer w-1/2 sm:w-full h-auto gap-1 select-none text-center px-8 py-4 flex flex-col justify-center items-center border border-red-900/10 bg-transparent backdrop-background-color backdrop-background-color-hover transition-colors backdrop-blur-md rounded-md",
  };

  return (
    <>
      <div className="text-red-900 text-sm container mx-auto lg:max-w-screen-lg font-medium my-2 flex flex-col justify-center">
        <form>
        <PaymentElement />
        {/*
          <div className="flex w-full items-center gap-5 mb-3">
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
          <div className="flex w-full items-center gap-5 mb-3">
            <div className="w-full items-center gap-1.5">
              <Label htmlFor="email">
                Email
                <span className="float-right opacity-50">(nepovinné)</span>
              </Label>
              <div className="relative">
                <Mail className={inputStyles.icons} />
                <Input type="email" id="email" className={inputStyles.styles} />
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
          <div className="flex w-full items-center gap-5 mb-3">
            <div className="w-full items-center gap-1.5">
              <Label htmlFor="email">Adresa</Label>
              <div className="relative">
                <House className={inputStyles.icons} />
                <Input type="email" id="email" className={inputStyles.styles} />
              </div>
            </div>
          </div>
          <div className="flex w-full items-center gap-5 mb-3">
            <div className="w-full items-center gap-1.5">
              <Label htmlFor="email">Město</Label>
              <div className="relative">
                <Building2 className={inputStyles.icons} />
                <Input type="email" id="email" className={inputStyles.styles} />
              </div>
            </div>
          </div>
          */}
        </form>
        <div className="text-lg">Způsob platby</div>
        <div className="flex mt-3 justify-between gap-5">
          <div className={inputStyles.boxes} onClick={() => selectPM(0)}>
            <span>Dobírkou</span>
            <Truck />
          </div>
          <div className={inputStyles.boxes} onClick={() => selectPM(1)}>
            <span>Online platbou</span>
            <Lock />
          </div>
          <div className={inputStyles.boxes} onClick={() => selectPM(2)}>
            <span>Bankovním převodem</span>
            <CreditCard />
          </div>
          <div className={inputStyles.boxes} onClick={() => selectPM(3)}>
            <span>QR kódem</span>
            <QrCode />
          </div>
        </div>
      </div>
    </>
  );
}
