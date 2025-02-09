import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllFavourites, deleteFavourite } from "@/models/Favourites";
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
  const [isLoaded, setLoaded] = useState(false);

  const loadFavourites = async () => {
    const data = await getAllFavourites();
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setFavourites(data.payload);
      setLoaded(true);
    }
  };

  const removeFavouriteItem = async (id) => {
    const data = await deleteFavourite(id);
    if (data.status === 200) {
      //console.log("odstraneno");
    }
    loadFavourites();
  };

  useEffect(() => {
    loadFavourites();
  }, []);
  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="mt-3.5" />
        <div className="text-red-900 text-sm container mx-auto px-4 lg:max-w-screen-lg mb-6 mt-6 flex flex-col justify-center">
          {isLoaded !== null && favourites ? (
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
                      key={index}
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
                              onClick={() => removeFavouriteItem(item._id)}
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
