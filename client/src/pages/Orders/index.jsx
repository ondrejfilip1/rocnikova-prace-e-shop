import Header from "@/components/Header";
import s from "./Orders.module.css";
import CartItemBig from "./CartItemBig";
import { useState, Fragment, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Checkout from "./Checkout";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getPublicKey, createPaymentIntent } from "@/models/Stripe";

export default function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemPrices, setItemPrices] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [heading, setHeading] = useState("Nákupní košík");
  const [showCheckoutBool, setShowCheckoutBool] = useState(false);

  // Stripe
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setTotalProducts(cart.length);
      setCartItems(cart);
      setLoaded(true);
    }
  };

  // podle ID itemu pocita celkovou castku
  const calcPrice = (index, price, itemId) => {
    setItemPrices((prevPrices) => {
      const prices2 = { ...prevPrices, [`${itemId}-${index}`]: price };
      //console.log(prices2);
      let newTotalPrice = 0;

      for (let id in prices2) {
        newTotalPrice += prices2[id];
      }

      setTotalPrice(newTotalPrice);
      return prices2;
    });
  };

  // v podstate to samy, ale odecte hodnotu itemu z celkove castky
  const removePrice = (itemId, index) => {
    setItemPrices((prevPrices) => {
      const prices2 = { ...prevPrices };
      delete prices2[`${itemId}-${index}`];
      //console.log(prices2);
      let newTotalPrice = 0;

      for (let id in prices2) {
        newTotalPrice += prices2[id];
      }
      setTotalPrice(newTotalPrice);
      return prices2;
    });
  };

  const loadStripeKey = async () => {
    const stripeKey = await getPublicKey();
    if (stripeKey.status === 200)
      setStripePromise(loadStripe(stripeKey.publishableKey));
  };

  const loadPaymentIntent = async () => {
    const paymentIntent = await createPaymentIntent(totalPrice * 100);
    if (paymentIntent.status === 200)
      setClientSecret(paymentIntent.clientSecret);
  };

  const showCheckout = () => {
    if (
      cartItems.length !== 0 &&
      Object.keys(itemPrices).length === cartItems.length
    )
      loadPaymentIntent();
    setHeading("Platba");
    setShowCheckoutBool(true);
  };

  useEffect(() => {
    loadCart();
    document.title = "Pigress - Nákupní košík";
    loadStripeKey();
  }, []);

  return (
    <>
      <div className="background">
        <Header />
        <div className="mt-3.5" />
        <div className="text-red-900 text-sm container mx-auto px-4 lg:max-w-screen-lg font-medium py-2 flex flex-col justify-center">
          {cartItems && cartItems.length > 0 ? (
            <>
              <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6 mt-2">
                <span>{heading}</span>
                <span className="rounded-full background-primary min-w-5 px-1.5 text-center text-sm text-primary-light">
                  {totalProducts}
                </span>
              </div>
              {showCheckoutBool && clientSecret ? (
                <>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret: clientSecret,
                      fonts: [
                        {
                          cssSrc:
                            "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
                        },
                      ],
                      appearance: {
                        variables: {
                          colorText: "#7f1d1d",
                          colorPrimary: "#db7070",
                          colorBackground: "#f9e2e266",
                          colorDanger: "#df1b41",
                          fontFamily: "Manrope",
                          spacingUnit: "4px",
                          borderRadius: "6px",
                        },
                      },
                    }}
                  >
                    <Checkout totalPrice={totalPrice} />
                  </Elements>
                </>
              ) : null}
              <div className={showCheckoutBool ? "hidden" : ""}>
                {cartItems.map((item, index) => {
                  return (
                    // key musi byt unikatni, jinak bude renderovani divny
                    <Fragment
                      key={`${item.productId}-${index}-${totalProducts}`}
                    >
                      <CartItemBig
                        index={index}
                        productId={item.productId}
                        quantity={item.quantity}
                        color={item.color}
                        reloadCart={loadCart}
                        itemPrice={calcPrice}
                        removeItemPrice={removePrice}
                      />
                      <div className="border-b border-red-900/25 my-2" />
                    </Fragment>
                  );
                })}
              </div>

              <div className={showCheckoutBool ? "hidden" : ""}>
                <div className="flex justify-between items-center mx-4 text-sm text-red-900/75 mt-5">
                  <div>Cena bez DPH</div>
                  {
                    // Vypocet ceny bez DPH
                    // https://www.matematika.cz/vypocet-dph/
                  }
                  <div>{Math.floor(totalPrice / 1.15)} Kč</div>
                </div>
                <div className="flex justify-between items-center mx-4 text-lg mb-5">
                  <div>Celkem</div>
                  <div>{totalPrice} Kč</div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <Link to="/view-products">
                    <Button
                      className="background-button-hover !text-red-900 gap-1 pl-3"
                      variant="ghost"
                    >
                      <ChevronLeft />
                      <div>Zpět k nákupu</div>
                    </Button>
                  </Link>
                  {
                    // background-primary background-primary-hover
                  }
                  <Button
                    className="text-white bg-red-900 hover:bg-red-950 gap-1 pr-3"
                    onClick={() => showCheckout()}
                  >
                    {!isLoaded ? (
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
                        className="animate-spin mx-8"
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    ) : (
                      <>
                        <div>Pokračovat</div>
                        <ChevronRight />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center flex-col placeholder-min-h-screen">
                <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
                  <span>Nákupní košík</span>
                </div>
                <p className="text-center font-medium">V košíku nic nemáte</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
