import Header from "@/components/Header";
import { getAllFavourites } from "@/models/Favourites";
import { useState, useEffect } from "react";
import { colorsTranslated } from "@/components/constants";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const loadFavourites = async () => {
    const data = await getAllFavourites();
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setFavourites(data.payload);
      console.log(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadFavourites();
  }, []);
  return (
    <>
      <div className="background">
        <Header />
        <div className="mt-3.5" />
        <div className="text-red-900 text-sm container mx-auto px-4 lg:max-w-screen-lg font-medium my-2 flex flex-col justify-center">
          {isLoaded !== null && favourites ? (
            <>
              <div className="flex items-center justify-center flex-col placeholder-min-h-screen">
                <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
                  <span>Oblíbené položky</span>
                </div>
                {favourites.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.productId} - {colorsTranslated[item.color]}
                      <br />
                    </div>
                  );
                })}
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
      </div>
    </>
  );
}
