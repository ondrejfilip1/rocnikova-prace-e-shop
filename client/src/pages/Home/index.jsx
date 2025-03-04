import { Link } from "react-router-dom";
import s from "./Home.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Truck,
  PackageCheck,
  CalendarClock,
  Mouse,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

import React from "react";
import classNames from "classnames";

export default function Home() {
  const [position, setPosition] = useState({ first: 0, second: 0, third: 0 });

  const cardStyles = {
    icons: "h-8 w-8",
    cards:
      "relative flex md:flex-auto w-full mx-auto justify-stretch gap-2 md:w-0 md:max-w-full h-auto flex-col items-center text-center card_background px-4 py-8 rounded-3xl",
  };

  const handleMouse = (e) => {
    const element = e.target.getBoundingClientRect();
    switch (e.target.id) {
      case "box1":
        setPosition({ first: e.clientX - element.left });
        break;
      case "box2":
        setPosition({ second: e.clientX - element.left });
        break;
      case "box3":
        setPosition({ third: e.clientX - element.left });
        break;
    }
  };

  useEffect(() => {
    document.title = "Pigress";
  }, []);

  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className={classNames(s.heading_container, "relative")}>
          <div className={s.heading}>
            <div>PIGRESS</div>
            <h1>PIGRESS</h1>
            <h1>PIGRESS</h1>
            <p
              className={classNames(
                s.heading_description,
                "text-2xl tracking-normal m-[7vw] font-light"
              )}
            >
              Styl a kvalita na jednom místě.
            </p>
          </div>

          <motion.div
            className="absolute p-6 bottom-0 flex justify-center items-center flex-col text-primary cursor-pointer gap-1"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .5, delay: 2 }}
          >
            <Mouse />
            <div>Přejít dolů</div>
          </motion.div>
        </div>

        <div className="min-h-screen" />
        <div className="flex flex-col md:flex-row justify-between gap-4 text-red-900 font-medium my-4 container mx-auto">
          <div className={cardStyles.cards} onMouseMove={handleMouse}>
            <div
              className="w-full top-0 left-0 h-full bg-transparent absolute rounded-3xl border-[3px] border-red-300/50 transition-opacity duration-500"
              style={{
                WebkitMaskImage: `linear-gradient(90deg, transparent ${
                  position.first - 120
                }px, black ${position.first - 30}px, black ${
                  position.first + 30
                }px, transparent ${position.first + 120}px)`,
                opacity: "0",
              }}
              onMouseLeave={(e) => (e.target.style.opacity = "0")}
              onMouseEnter={(e) => (e.target.style.opacity = "1")}
              id="box1"
            />
            <Truck className={cardStyles.icons} />
            <span>Rychlé dodání</span>
          </div>
          <div className={cardStyles.cards} onMouseMove={handleMouse}>
            <div
              className="w-full top-0 left-0 h-full bg-transparent absolute rounded-3xl border-[3px] border-red-300/50 transition-opacity duration-500"
              style={{
                WebkitMaskImage: `linear-gradient(90deg, transparent ${
                  position.second - 120
                }px, black ${position.second - 30}px, black ${
                  position.second + 30
                }px, transparent ${position.second + 120}px)`,
                opacity: "0",
              }}
              onMouseLeave={(e) => (e.target.style.opacity = "0")}
              onMouseEnter={(e) => (e.target.style.opacity = "1")}
              id="box2"
            />
            <PackageCheck className={cardStyles.icons} />
            <span>Bezplatná doprava a vrácení zboží</span>
          </div>
          <div className={cardStyles.cards} onMouseMove={handleMouse}>
            <div
              className="w-full top-0 left-0 h-full bg-transparent absolute rounded-3xl border-[3px] border-red-300/50 transition-opacity duration-500"
              style={{
                WebkitMaskImage: `linear-gradient(90deg, transparent ${
                  position.third - 120
                }px, black ${position.third - 30}px, black ${
                  position.third + 30
                }px, transparent ${position.third + 120}px)`,
                opacity: "0",
              }}
              onMouseLeave={(e) => (e.target.style.opacity = "0")}
              onMouseEnter={(e) => (e.target.style.opacity = "1")}
              id="box3"
            />
            <CalendarClock className={cardStyles.icons} />
            <span>Možnost vrácení zboží do 3 měsíců</span>
          </div>
        </div>

        <div className="h-fit container mx-auto rounded-3xl backdrop-background-color backdrop-blur-2xl md:pb-0 pb-10 custom_shadow">
          <div className="flex items-center justify-between md:gap-10 gap-5 mx-auto md:flex-row flex-col ">
            <div className="aspect-square rounded-lg border border-transparent w-full md:w-1/2 text-center">
              <div
                className={classNames(
                  "flex justify-center items-center h-full flex-col mt-5 mb-5 md:mt-10 md:mb-10 md:ml-10 md:mr-0 ml-5 mr-5 relative rounded-xl overflow-hidden",
                  s.parent_box
                )}
              >
                <div className={s.overlay_background} />
                <div
                  className={classNames(
                    s.background_fashion,
                    s.background_fashion_man,
                    "h-full w-full absolute"
                  )}
                />
                <div className="text-lg text-white mix-blend-difference relative z-2">
                  Objevte módu, která vám sedne.
                </div>
                <div className="absolute bottom-8 left-8 z-2">
                  <Button
                    className={classNames(
                      "backdrop-blur-md bg-black/25 hover:bg-black/50 pr-3",
                      s.button_browse
                    )}
                  >
                    Procházet
                    <ArrowUpRight />
                  </Button>
                </div>
                <div className="absolute top-8 right-8 z-2">
                  <Button className="backdrop-blur-md bg-black/25 hover:bg-black/50 cursor-default">
                    Muži
                  </Button>
                </div>
              </div>
            </div>
            <div className="aspect-square rounded-lg border border-transparent w-full md:w-1/2 text-center">
              <div
                className={classNames(
                  "flex justify-center items-center h-full flex-col mt-5 mb-5 md:mt-10 md:mb-10 md:mr-10 md:ml-0 mr-5 ml-5 relative rounded-xl overflow-hidden",
                  s.parent_box
                )}
              >
                <div className={s.overlay_background} />
                <div
                  className={classNames(
                    s.background_fashion,
                    s.background_fashion_woman,
                    "h-full w-full absolute"
                  )}
                />
                <div className="text-lg text-white mix-blend-difference relative z-2">
                  Najděte svůj nový oblíbený kousek.
                </div>
                <div className="absolute bottom-8 left-8 z-2">
                  <Button
                    className={classNames(
                      "backdrop-blur-md bg-black/25 hover:bg-black/50 pr-3",
                      s.button_browse
                    )}
                  >
                    Procházet
                    <ArrowUpRight />
                  </Button>
                </div>
                <div className="absolute top-8 right-8 z-2">
                  <Button className="backdrop-blur-md bg-black/25 hover:bg-black/50 cursor-default">
                    Ženy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />

        {/*
        <Link to={"/add-car"}>
            <p>Add car</p>
        </Link>

        <Link to={"/view-cars"}>
            <p>View car</p>
        </Link>
        */}
      </div>
    </>
  );
}
