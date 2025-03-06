import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CircleCheckBig } from "lucide-react";
import NotFound from "@/components/NotFound";
import { useEffect } from "react";

export default function Completion() {
  const query = new URLSearchParams(location.search);
  const redirectStatus = query.get("redirect_status") || "";
  const paymentIntent = query.get("payment_intent") || "";

  useEffect(() => {
    if (query && redirectStatus === "succeeded" && paymentIntent) {
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("totalItemsUpdate"));
    }
  }, []);
  return (
    <>
      <div className="background">
        <Header />
        <div className="mt-3.5" />
        {redirectStatus === "succeeded" && paymentIntent ? (
          <>
            <div className="flex items-center justify-center flex-col placeholder-min-h-screen text-red-900">
              <CircleCheckBig className="!w-16 !h-16 py-2" />
              <div className="text-2xl flex items-center gap-2 justify-center mb-3">
                <span>Platba dokončena</span>
              </div>
              <p className="text-center text-base mb-1 font-medium">
                ID platby
              </p>
              <p className="text-center text-sm">{paymentIntent}</p>
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
