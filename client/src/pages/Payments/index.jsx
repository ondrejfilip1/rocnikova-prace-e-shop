import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { getPaymentIntent } from "@/models/Stripe";
import LoadingScreen from "@/components/LoadingScreen";
import moment from "moment";
import { Link } from "react-router-dom";
import classNames from "classnames";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [paymentsLocal, setPaymentsLocal] = useState(
    JSON.parse(localStorage.getItem("payments"))
  );

  useEffect(() => {
    loadPayments();
    document.title = "Pigress - Platby";
  }, []);

  const loadPayments = async () => {
    if (paymentsLocal) {
      const paymentsArray = [];
      // vsechny platby se nactou naraz
      for (const item of paymentsLocal) {
        const data = await getPayment(item.paymentIntent);
        paymentsArray.push(data);
      }
      setPayments(paymentsArray);
    }
    setLoaded(true);
  };

  const getPayment = async (paymentId) => {
    console.log(
      JSON.parse(JSON.parse(localStorage.getItem("payments"))[0].cart)
    );
    const data = await getPaymentIntent(paymentId);
    console.log(data.paymentIntent);
    if (data.status === 200) return data;
    else return null;
  };

  if (isLoaded === null || !isLoaded) return <LoadingScreen />;

  const styles = {
    link: "text-sm relative inline-block w-fit after:block after:h-[1px] after:content-[''] after:absolute after:bg-red-900/50 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-bottom-right hover:after:origin-bottom-left",
  };

  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="mt-3.5" />

        {payments.length > 0 ? (
          <>
            <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
              <span>Platby</span>
            </div>
            <div className="container mx-auto pb-24 font-medium px-2 text-red-900 placeholder-min-h-screen flex flex-col">
              {payments
                // sortuju podle data vytvoreni (nejnovejsi platby nahore)
                .sort(
                  (a, b) => b.paymentIntent.created - a.paymentIntent.created
                )
                .map((item, index) => {
                  return (
                    <Fragment key={item.paymentIntent.id}>
                      <div className="background-light-hover transition-colors rounded-md p-4 flex sm:flex-row flex-col relative">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="absolute right-2 top-2 !text-red-900 background-button-hover"
                            >
                              <ShoppingCart />
                              Zobrazit položky
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px] text-red-900 background-primary-light">
                            <DialogHeader>
                              <DialogTitle>Nakoupené položky</DialogTitle>
                            </DialogHeader>
                            <div>
                              {JSON.parse(
                                // ziskam nejnovejsi kosik z platby
                                paymentsLocal[paymentsLocal.length - index - 1]
                                  ?.cart || "[]"
                              ).map((item, index) => {
                                return (
                                  <>
                                    <div key={index} className="text-sm mb-2">
                                      <Link
                                        target={"_blank"}
                                        to={`/product/${item.productId}`}
                                        className={styles.link}
                                      >
                                        Odkaz na produkt
                                      </Link>
                                      <div className="float-right flex gap-1 items-center">
                                        <span>{item.quantity}x</span>
                                        <div
                                          className={classNames(
                                            item.color === "white" &&
                                              "color_white_svg",
                                            item.color === "black" &&
                                              "color_black_svg",
                                            item.color === "gray" &&
                                              "color_gray_svg",
                                            item.color === "brown" &&
                                              "color_brown_svg",
                                            item.color === "beige" &&
                                              "color_beige_svg",
                                            item.color === "olive" &&
                                              "color_olive_svg",
                                            item.color === "sea_blue" &&
                                              "color_sea_blue_svg",
                                            item.color === "red" &&
                                              "color_red_svg",
                                            item.color === "purple" &&
                                              "color_purple_svg",
                                            item.color === "light_blue" &&
                                              "color_light_blue_svg",
                                            item.color === "blue" &&
                                              "color_blue_svg",
                                            item.color === "green" &&
                                              "color_green_svg",
                                            item.color === "pastel_yellow" &&
                                              "color_pastel_yellow_svg",
                                            "radio_svg_fix",

                                            "rounded-full border border-red-900/25 h-4 w-4"
                                          )}
                                        ></div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </DialogContent>
                        </Dialog>

                        <div className="w-1/2">
                          <div>ID Platby</div>
                          <div className="font-normal text-sm mb-2">
                            {item.paymentIntent.id}
                          </div>
                          <div>Částka</div>
                          <div className="font-normal text-sm mb-2">
                            {`${
                              item.paymentIntent.amount / 100
                            } ${item.paymentIntent.currency.toUpperCase()}`}
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div>Datum</div>
                          <div className="font-normal text-sm mb-2">
                            {moment(item.paymentIntent.created * 1000)
                              .locale("cz")
                              .format("DD.MM.YYYY HH:mm")}
                          </div>
                          <div>Stav</div>
                          <div className="font-normal text-sm">
                            {item.paymentIntent.status === "succeeded"
                              ? "Úspěšný"
                              : "Neproběhlo"}
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-red-900/25 my-2" />
                    </Fragment>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center flex-col placeholder-min-h-screen text-red-900">
              <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
                <span>Platby</span>
              </div>
              <p className="text-center font-medium text-sm">
                Nemáte žádné provedené platby
              </p>
            </div>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}
