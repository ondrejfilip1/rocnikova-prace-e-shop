import NotFound from "@/components/NotFound";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFoundPage() {
  // jmeno stranky
  const webPageName = location.pathname.split("/");

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
