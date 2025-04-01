import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CircleCheckBig } from "lucide-react";
import NotFound from "@/components/NotFound";
import { useEffect } from "react";
import s from "./Completion.module.css";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function Completion() {
  const query = new URLSearchParams(location.search);
  const redirectStatus = query.get("redirect_status") || "";
  const paymentIntent = query.get("payment_intent") || "";

  useEffect(() => {
    document.title = "Děkujeme za nákup";
    if (query && redirectStatus === "succeeded" && paymentIntent) {
      window.dispatchEvent(new Event("totalItemsUpdate"));

      const payments = JSON.parse(localStorage.getItem("payments")) || "";
      // jestli "payments" uz v sobe nemaji stejny paymentIntent
      let doesIncludePayInt = false;
      if (payments)
        payments.map((item) => {
          doesIncludePayInt = item.paymentIntent.includes(paymentIntent);
          //console.log(item);
        });
      if (!doesIncludePayInt) {
        const paymentsNew = JSON.stringify([
          ...payments,
          { paymentIntent: paymentIntent, cart: localStorage.getItem("cart") },
        ]);
        localStorage.setItem("payments", paymentsNew) || "[]";
        localStorage.removeItem("cart");
      }
    }
  }, []);

  const styles = {
    link: "text-sm relative inline-block w-fit after:block after:h-[1px] after:content-[''] after:absolute after:bg-red-900/50 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-bottom-right hover:after:origin-bottom-left",
  };
  return (
    <>
      <div className="background">
        <Header />
        <div className="mt-3.5" />
        {redirectStatus === "succeeded" && paymentIntent ? (
          <>
            <div className="flex items-center justify-center flex-col placeholder-min-h-screen text-red-900 relative">
              <CircleCheckBig
                className={classNames("!w-16 !h-16 py-2", s.icon_anim)}
              />
              <div className="text-2xl flex items-center gap-2 justify-center mb-3">
                <span>Platba dokončena</span>
              </div>
              <p className="text-center text-base font-medium">
                Děkujeme, že jste u nás nakupovali
              </p>
              <div className="absolute bottom-0">
                <p className="text-center text-sm mb-1 font-normal">
                  Vaše platby naleznete{" "}
                  <Link
                    to="/platby"
                    className={classNames(styles.link, "font-bold")}
                  >
                    zde
                  </Link>
                  .
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-6 placeholder-min-h-screen">
              <NotFound
                link="/objednavky"
                content="Nákupní košík"
                description="Stránka nebyla nalezena"
              />
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
}
