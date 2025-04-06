import NotFound from "@/components/NotFound";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect } from "react";

export default function NotFoundPage() {
  // jmeno stranky
  const webPageName = location.pathname.split("/");

  useEffect(() => {
    document.title = "Pigress - 404";
  }, []);

  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <NotFound
          description={`Stránka "${
            webPageName[webPageName.length - 1]
          }" nebyla nalezena`}
          link="/"
          content="Zpět na hlavní stránku"
        />
        <Footer />
      </div>
    </>
  );
}
