import Header from "@/components/Header";
import s from "./Orders.module.css";
import CartItemBig from "./CartItemBig";
import { useState, Fragment, useEffect } from "react";
import { getAllItems } from "@/models/Cart";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemPrices, setItemPrices] = useState({});

  const loadCart = async () => {
    //console.log("aaa");
    const data = await getAllItems();
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setCartItems(data.payload);
      setLoaded(true);
    }
  };

  // podle ID itemu pocita celkovou castku
  const calcPrice = (itemId, price) => {
    setItemPrices((prevPrices) => {
      const prices2 = { ...prevPrices, [itemId]: price };
      let newTotalPrice = 0;

      for (let id in prices2) {
        newTotalPrice += prices2[id];
      }

      setTotalPrice(newTotalPrice);
      return prices2;
    });
  };

  // v podstate to samy, ale odecte hodnotu itemu z celkove castky
  const removePrice = (itemId) => {
    setItemPrices((prevPrices) => {
      const prices2 = { ...prevPrices };
      delete prices2[itemId];
      let newTotalPrice = 0;

      for (let id in prices2) {
        newTotalPrice += prices2[id];
      }

      setTotalPrice(newTotalPrice);
      return prices2;
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <div className="background">
        <Header />
        <div className="header-placeholder" />
        <div className="text-red-900 text-sm container mx-auto px-4 lg:max-w-screen-lg font-medium my-2 flex flex-col justify-center">
          {isLoaded !== null && cartItems ? (
            <>
              <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6 mt-2">
                <span>Nákupní košík</span>
              </div>
              {cartItems.map((item, index) => {
                return (
                  <Fragment key={item._id}>
                    <CartItemBig
                      productId={item.items[0].productId}
                      quantity={item.items[0].quantity}
                      color={item.items[0].color}
                      itemId={item._id}
                      itemOrigId={item.items[0]._id}
                      reloadCart={loadCart}
                      itemPrice={calcPrice}
                      removeItemPrice={removePrice}
                    />
                    <div className="border-b border-red-900/25 my-2" />
                  </Fragment>
                );
              })}
              <div className="flex justify-between items-center mx-4 text-sm text-red-900/75 mt-5">
                <div>Cena bez DPH</div>
                {
                  // Vypocet ceny bez DPH
                  // https://www.matematika.cz/vypocet-dph/
                }
                <div>{Math.floor(totalPrice / 1.15)} Kč</div>
              </div>
              <div className="flex justify-between items-center mx-4 text-lg mb-5">
                <div>Celkem</div>
                <div>{totalPrice} Kč</div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <Link to="/view-products">
                  <Button
                    className="background-button-hover !text-red-900 gap-1 pl-3"
                    variant="ghost"
                  >
                    <ChevronLeft />
                    <div>Zpět k nákupu</div>
                  </Button>
                </Link>
                {
                  // background-primary background-primary-hover
                }
                <Link to="/zaplaceni">
                <Button className="text-white bg-red-900 hover:bg-red-950 gap-1 pr-3">
                  <div>Pokračovat</div>
                  <ChevronRight />
                </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center flex-col placeholder-min-h-screen">
                <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
                  <span>Nákupní košík</span>
                </div>
                <p className="text-center font-medium">V košíku nic nemáte</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
