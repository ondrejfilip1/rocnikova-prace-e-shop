import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldX, ShieldCheck, Scale } from "lucide-react";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DataProtection() {
  useEffect(() => {
    document.title = "Pigress - Ochrana osobních údajů";
  }, []);

  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="mt-3.5" />
        <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
          <span>Ochrana osobních údajů</span>
        </div>
        <div className="container mx-auto pb-24 font-medium px-2 text-red-900 placeholder-min-h-screen flex flex-col lg:max-w-screen-lg">
          <h1 className="text-3xl my-4 flex items-center justify-between">Jaká data shromažďujeme?<ShieldCheck className="w-6 h-6" /></h1>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-red-900/10">
              <AccordionTrigger>E-mailová adresa</AccordionTrigger>
              <AccordionContent>
                Pokud se přihlásíte k odběru našeho newsletteru, uložíme vaši
                e-mailovou adresu. Používáme ji výhradně pro zasílání novinek,
                slev a informací o našich produktech. Z odběru se můžete
                kdykoliv odhlásit pomocí zaslání e-mailu na náš e-mail podpory.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-red-900/10">
              <AccordionTrigger>Uživatelské jméno (přezdívka)</AccordionTrigger>
              <AccordionContent>
                Pokud se rozhodnete napsat recenzi, můžete (ale nemusíte) uvést
                své jméno nebo přezdívku. Tento údaj slouží pouze k identifikaci
                autora recenze a není dále zpracováván.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <h1 className="text-3xl my-4 flex items-center justify-between">Data, které neshromažďujeme<ShieldX className="w-6 h-6" /></h1>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-red-900/10">
              <AccordionTrigger>Platební údaje</AccordionTrigger>
              <AccordionContent>
                Veškeré platby na našem e-shopu probíhají prostřednictvím
                zabezpečených platebních bran. My jako provozovatel e-shopu
                nikdy nevidíme ani neukládáme žádné údaje o vašich platebních
                kartách.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <h1 className="text-3xl my-4 flex items-center justify-between">Vaše práva<Scale className="w-6 h-6" /></h1>

          <p className="my-3 leading-7">
            V souladu s nařízením GDPR máte právo:
            <ol className="list-disc list-inside">
              <li>požádat o přístup ke svým osobním údajům</li>
              <li>požádat o opravu nebo výmaz údajů</li>
              <li>vznést námitku proti zpracování</li>
              <li>
                kdykoliv odvolat souhlas se zpracováním údajů (např. odhlášením
                z newsletteru).
              </li>
            </ol>
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}
