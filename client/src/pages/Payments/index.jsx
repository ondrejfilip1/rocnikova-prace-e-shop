import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Fragment, useEffect, useState } from "react";
import { getPaymentIntent } from "@/models/Stripe";
import LoadingScreen from "@/components/LoadingScreen";
import moment from "moment";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const paymentsVar = JSON.parse(localStorage.getItem("payments"));
    if (paymentsVar) {
      const paymentsArray = [];
      // vsechny platby se nactou naraz
      for (const item of paymentsVar) {
        const data = await getPayment(item);
        paymentsArray.push(data);
      }
      setPayments(paymentsArray);
      setLoaded(true);
    }
  };

  const getPayment = async (paymentId) => {
    const data = await getPaymentIntent(paymentId);
    console.log(data.paymentIntent);
    if (data.status === 200) return data;
    else console.log("error");
  };

  if (isLoaded === null || !isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="mt-3.5" />
        <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
          <span>Platby</span>
        </div>
        {payments.length > 0 ? (
          <div className="container mx-auto pb-24 font-medium px-2 text-red-900 placeholder-min-h-screen flex flex-col">
            {payments.map((item, index) => {
              return (
                <Fragment key={item.paymentIntent.id}>
                  <div className="background-light-hover transition-colors rounded-md py-3 px-4 flex sm:flex-row flex-col">
                    <div className="w-1/2">
                      <div>
                        ID Platby
                      </div>
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
                          .format("MM/DD/YYYY HH:mm")}
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
        ) : (
          <div className="container mx-auto pb-24 font-medium px-2 text-red-900 placeholder-min-h-screen text-center flex items-center justify-center">
            Nemáte žádné provedené platby
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}
