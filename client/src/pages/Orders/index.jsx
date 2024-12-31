import Header from "@/components/Header";
import s from "./Orders.module.css";
import CartItemBig from "./CartItemBig";
import { useState, Fragment, useEffect } from "react";
import { getAllItems } from "@/models/Cart";

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
      <div className={s.background}>
        <Header />
        <div className="header-placeholder" />
        <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6 mt-2">
          <span>Nákupní košík</span>
        </div>
        <div className="text-red-900 text-sm container mx-auto px-4 lg:max-w-screen-lg font-medium my-2">
          {isLoaded !== null && cartItems ? (
            <>
              {cartItems.map((item, index) => {
                return (
                  <Fragment key={item._id}>
                    <CartItemBig
                      productId={item.items[0].productId}
                      quantity={item.items[0].quantity}
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
              <div className="flex justify-between items-center mx-4 text-lg">
                <div>Celkem</div>
                <div>{totalPrice} Kč</div>
              </div>
            </>
          ) : (
            <p className="text-center font-medium">V košíku nic nemáte</p>
          )}
        </div>
      </div>
    </>
  );
}
