import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Obrazek1 from "../../assets/images/about/nature.jpg";
import * as motion from "motion/react-client";
import s from "./About.module.css";
import classNames from "classnames";

export default function About() {
  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="container mx-auto text-red-900">
          <motion.div
            initial={{ opacity: 0, transform: "translateX(100px)" }}
            whileInView={{ opacity: 1, transform: "translateX(0px)" }}
            transition={{ duration: 0.8 }}
            className="flex placeholder-min-h-screen my-14"
          >
            <div className="w-1/2 flex justify-center flex-col">
              <h1 className="text-5xl mb-3">O nás</h1>
              <p>
                Vítejte v Pigress - místě, kde móda splňuje udržitelnost a
                kvalitu. Jsme český e-shop s oblečením, který věří, že styl a
                odpovědnost mohou jít ruku v ruce. Naší misí je nabízet moderní,
                vkusné a nadčasové kousky, které nejen skvěle vypadají, ale také
                respektují naši planetu a potřeby zákazníků.
              </p>
            </div>
            <div className="w-1/2 flex justify-center flex-col items-center">
              <div className={classNames("w-1/2 relative", s.animation_shadow)}>
                <img
                  src={Obrazek1}
                  alt=""
                  className="rounded-xl aspect-[2/3] object-cover border-[3px] border-red-300 relative z-[1]"
                />
                <div className="rounded-xl aspect-[2/3] object-cover h-full bg-linear-65 bg-red-300 absolute top-0 translate-x-4 translate-y-4" />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex placeholder-min-h-screen my-14"
            initial={{ opacity: 0, transform: "translateX(-100px)" }}
            whileInView={{ opacity: 1, transform: "translateX(0px)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-1/2 flex justify-center flex-col items-center">
              <div className={classNames("w-1/2 relative", s.animation_shadow)}>
                <img
                  src={Obrazek1}
                  alt=""
                  className="rounded-xl aspect-[2/3] object-cover border-[3px] border-red-300 relative z-[1]"
                />
                <div className="rounded-xl aspect-[2/3] object-cover h-full bg-linear-65 bg-red-300 absolute top-0 translate-x-4 translate-y-4" />
              </div>
            </div>
            <div className="w-1/2 flex justify-center flex-col">
              <h1 className="text-5xl mb-3">Naše filozofie</h1>
              <p>
                V Pigress jsme přesvědčeni, že udržitelná móda není jen trendem,
                ale nezbytností. Proto vybíráme oblečení, které je vyráběno s
                ohledem na etické pracovní podmínky, ekologické materiály a
                snižování dopadu na životní prostředí. Dáváme přednost kvalitním
                látkám, recyklovaným materiálům a lokální výrobě, abychom
                zajistili, že naše produkty jsou nejen krásné, ale také
                odpovědné.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="flex placeholder-min-h-screen my-14"
            initial={{ opacity: 0, transform: "translateX(100px)" }}
            whileInView={{ opacity: 1, transform: "translateX(0px)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-1/2 flex justify-center flex-col">
              <h1 className="text-5xl mb-3">Kvalita na prvním místě</h1>
              <p>
                Chceme, abyste si každý kousek, který si u nás vyberete,
                zamilovali. Proto spolupracujeme pouze s výrobci, kteří splňují
                nejvyšší standardy kvality. Oblečení, které najdete v našem
                e-shopu, je pečlivě vybrané tak, aby bylo pohodlné, odolné a
                snadno kombinovatelné. Věříme, že méně je více - raději
                investujeme do nadčasových kousků, které vydrží roky, než do
                rychlé módy, která má krátkou životnost.
              </p>
            </div>
            <div className="w-1/2 flex justify-center flex-col items-center">
              <div className={classNames("w-1/2 relative", s.animation_shadow)}>
                <img
                  src={Obrazek1}
                  alt=""
                  className="rounded-xl aspect-[2/3] object-cover border-[3px] border-red-300 relative z-[1]"
                />
                <div className="rounded-xl aspect-[2/3] object-cover h-full bg-linear-65 bg-red-300 absolute top-0 translate-x-4 translate-y-4" />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex placeholder-min-h-screen my-14"
            initial={{ opacity: 0, transform: "translateX(-100px)" }}
            whileInView={{ opacity: 1, transform: "translateX(0px)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-1/2 flex justify-center flex-col items-center">
              <div className={classNames("w-1/2 relative", s.animation_shadow)}>
                <img
                  src={Obrazek1}
                  alt=""
                  className="rounded-xl aspect-[2/3] object-cover border-[3px] border-red-300 relative z-[1]"
                />
                <div className="rounded-xl aspect-[2/3] object-cover h-full bg-linear-65 bg-red-300 absolute top-0 translate-x-4 translate-y-4" />
              </div>
            </div>
            <div className="w-1/2 flex justify-center flex-col">
              <h1 className="text-5xl mb-3">
                Spokojenost zákazníků na prvním místě
              </h1>
              <p>
                V Pigress nám záleží na tom, abyste se při nakupování cítili
                dobře a našli přesně to, co hledáte. Proto nabízíme přátelský
                zákaznický servis, snadnou a bezpečnou objednávku, rychlé
                doručení a možnost vrácení, pokud vám produkt nesedne. Rádi vám
                poradíme s výběrem nebo odpovíme na jakékoliv dotazy, protože
                vaši spokojenost stavíme na první místo.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="flex placeholder-min-h-screen my-14"
            initial={{ opacity: 0, transform: "translateX(100px)" }}
            whileInView={{ opacity: 1, transform: "translateX(0px)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-1/2 flex justify-center flex-col">
              <h1 className="text-5xl mb-3">Společně pro lepší budoucnost</h1>
              <p>
                Věříme, že každý malý krok směrem k udržitelnosti má smysl.
                Proto neustále hledáme nové způsoby, jak minimalizovat náš
                ekologický otisk - od recyklovatelného balení po podporu
                lokálních výrobců. Chceme inspirovat naše zákazníky k vědomému
                nakupování a ukázat, že styl a odpovědnost mohou jít ruku v
                ruce. Děkujeme, že jste součástí naší cesty. Společně můžeme
                tvořit lepší svět - a vypadat při tom skvěle!
              </p>
            </div>
            <div className="w-1/2 flex justify-center flex-col items-center">
              <div className={classNames("w-1/2 relative", s.animation_shadow)}>
                <img
                  src={Obrazek1}
                  alt=""
                  className="rounded-xl aspect-[2/3] object-cover border-[3px] border-red-300 relative z-[1]"
                />
                <div className="rounded-xl aspect-[2/3] object-cover h-full bg-linear-65 bg-red-300 absolute top-0 translate-x-4 translate-y-4" />
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
