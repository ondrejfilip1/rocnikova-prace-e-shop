import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import ProductLink from "./ProductLink";
import { colorsTranslated } from "@/components/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  const loadFavourites = async () => {
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites) setFavourites(favourites);
  };

  const removeFavouriteItem = async (id) => {
    const favourite = JSON.parse(localStorage.getItem("favourites"));

    let indexItem;
    favourite.map((value, index) => {
      if (value.productId === id) {
        indexItem = index;
      }
    });

    favourite.splice(indexItem, 1);

    localStorage.setItem("favourites", JSON.stringify(favourite));

    loadFavourites();
  };

  useEffect(() => {
    loadFavourites();
    document.title = "Pigress - Oblíbené položky";
  }, []);
  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="mt-3.5" />
        <div className="text-red-900 text-sm container mx-auto px-4 lg:max-w-screen-lg mb-6 mt-6 flex flex-col justify-center">
          {favourites && favourites.length > 0 ? (
            <>
              <div className="flex items-center justify-center flex-col">
                <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
                  <span>Oblíbené položky</span>
                </div>
              </div>
              <div className="placeholder-min-h-screen">
                <div className="flex flex-wrap gap-6 justify-center">
                  {favourites.map((item, index) => {
                    return (
                      <div
                        key={`${item.productId}-${index}`}
                        className="p-5 rounded-lg backdrop-background-color backdrop-blur-xl shadow-2xl relative aspect-square md:w-[48%] w-full flex justify-center"
                      >
                        <ProductLink
                          productId={item.productId}
                          color={item.color}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Trash2
                                onClick={() =>
                                  removeFavouriteItem(item.productId)
                                }
                                className="bg-transparent background-button-hover transition-colors inline-block text-red-900 p-2 h-9 w-9 rounded-md absolute cursor-pointer top-2 left-2"
                              />
                            </TooltipTrigger>
                            <TooltipContent
                              className="text-sm background-primary-light text-red-900 outline-none border-none"
                              side="bottom"
                            >
                              <p>Odebrat z oblíbených</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center flex-col placeholder-min-h-screen">
                <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
                  <span>Oblíbené položky</span>
                </div>
                <p className="text-center font-medium">Váš seznam je prázdný</p>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
