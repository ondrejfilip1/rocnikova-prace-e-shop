import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CircleHelp, FileText } from "lucide-react";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import reklamacni_formular from "../../assets/documents/reklamacni_formular.pdf"

export default function HelpCentre() {
  useEffect(() => {
    document.title = "Pigress - Centrum pomoci";
  }, []);

  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="mt-3.5" />
        <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
          <span>Centrum pomoci</span>
        </div>
        <div className="container mx-auto pb-24 font-medium px-2 text-red-900 placeholder-min-h-screen flex flex-col lg:max-w-screen-lg">
          <div className="flex items-center gap-2">
            <CircleHelp className="w-7 h-7" />
            <h1 className="text-3xl my-4">Máte problém?</h1>
          </div>

          <p className="my-3 leading-7">
            Zavolejte nám na naši bezplatnout linku{" "}
            <a href="tel:+702 002 320" className="underline">
              702 002 320
            </a>{" "}
            (Po-Pá, 7:00-20:00), nebo nás kontaktujte přes e-mail{" "}
            <a href="mailto:centrumpomoci@pigress.cz" className="underline">
              centrumpomoci@pigress.cz
            </a> – ozveme se co nejdříve, obvykle do 24 hodin.
          </p>

          <div className="flex items-center gap-2">
            <CircleHelp className="w-7 h-7" />
            <h1 className="text-3xl my-4">Často kladené otázky (FAQ)</h1>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <h1 className="text-xl my-6">Objednávky</h1>
            <AccordionItem value="item-1" className="border-red-900/10">
              <AccordionTrigger>
                Mohu změnit nebo zrušit objednávku po odeslání?
              </AccordionTrigger>
              <AccordionContent>
                Objednávku lze změnit nebo zrušit pouze před jejím odesláním.
                Pokud chceš provést změnu co nejdříve, kontaktuj nás co
                nejrychleji na e-mailu{" "}
                <a href="mailto:centrumpomoci@pigress.cz" className="underline">
                  centrumpomoci@pigress.cz
                </a>
                . Po odeslání už bohužel nelze objednávku upravit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-red-900/10">
              <AccordionTrigger>
                Nepřišlo mi potvrzení objednávky – co mám dělat?
              </AccordionTrigger>
              <AccordionContent>
                Zkontroluj prosím složku Spam nebo Hromadné ve své e-mailové
                schránce. Pokud tam potvrzení nenajdeš ani po 10 minutách,
                kontaktuj nás a ověříme, zda objednávka opravdu prošla.
              </AccordionContent>
            </AccordionItem>
            <h1 className="text-xl my-6">Vrácení zboží</h1>
            <AccordionItem value="item-3" className="border-red-900/10">
              <AccordionTrigger>
                Jak mohu zboží vrátit nebo vyměnit?
              </AccordionTrigger>
              <AccordionContent>
                <p>Pokud ti zboží nesedí nebo nesplnilo očekávání, můžeš ho vrátit
                nebo vyměnit do 3 měsíců od převzetí. Stačí nás kontaktovat a
                vyplnit jednoduchý formulář. Zboží musí být nenošené a v
                původním obalu.</p>
                <a href={reklamacni_formular} download={true}><Button variant="ghost" className="mt-4 background-button-hover !text-red-900"><FileText />Stáhnout reklamační formulář</Button></a>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-red-900/10">
              <AccordionTrigger>Kolik dní mám na vrácení?</AccordionTrigger>
              <AccordionContent>
                Na vrácení zboží máš 3 měsíce od jeho převzetí, v souladu s
                občanským zákoníkem. Peníze vracíme do 14 dnů od doručení
                vráceného zboží.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-red-900/10">
              <AccordionTrigger>
                Kdo platí poštovné při vrácení?
              </AccordionTrigger>
              <AccordionContent>
                Náklady na vrácení zboží hradí zákazník, pokud se nejedná o
                reklamaci vadného nebo poškozeného zboží. V takovém případě
                poštovné uhradíme my.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Footer />
      </div>
    </>
  );
}
