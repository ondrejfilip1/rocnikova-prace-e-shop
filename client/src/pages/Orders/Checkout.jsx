import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function Checkout(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState();
  const [isProcessing, setProcessing] = useState();
  const [isPaymentLoaded, setPaymentLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error")
      setMessage(error.message);
    else setMessage("An unexpected error occured.");

    setProcessing(false);
  };

  return (
    <>
      <div className="text-red-900 text-sm container mx-auto lg:max-w-screen-lg font-medium my-2 flex flex-col justify-center">
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement
            className="font-manrope-important"
            onLoaderStart={() => setPaymentLoaded(true)}
          />
          {!isPaymentLoaded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin mx-auto my-24"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : null}

          <div className="flex justify-between items-center mx-4 text-sm text-red-900/75 mt-5">
            <div>Cena bez DPH</div>
            {
              // Vypocet ceny bez DPH
              // https://www.matematika.cz/vypocet-dph/
            }
            <div>{Math.floor(props.totalPrice / 1.15)} Kč</div>
          </div>
          <div className="flex justify-between items-center mx-4 text-lg mb-5">
            <div>Celkem</div>
            <div>{props.totalPrice} Kč</div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Link to="/objednavky" onClick={() => window.location.reload()}>
              <Button
                className="background-button-hover !text-red-900 gap-1 pl-3"
                variant="ghost"
              >
                <ChevronLeft />
                <div>Zpět do košíku</div>
              </Button>
            </Link>
            {
              // background-primary background-primary-hover
            }
            <Button
              className="text-white bg-red-900 hover:bg-red-950 gap-1 pr-3"
              disabled={isProcessing || !stripe || !elements}
              id="submit"
              type="submit"
            >
              <span id="button-text" className="w-[51.48px]">
                {isProcessing ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-spin mx-auto"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                ) : (
                  "Zaplatit"
                )}
              </span>
              <ChevronRight />
            </Button>
          </div>
        </form>

        {/* 
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
        </div>*/}
      </div>
    </>
  );
}
