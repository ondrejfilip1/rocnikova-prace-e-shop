import Header from "@/components/Header";
import s from "./Orders.module.css";
import CartItemBig from "./CartItemBig";
import { useState, Fragment, useEffect } from "react";
import { getAllItems } from "@/models/Cart";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const loadCart = async () => {
    //console.log("aaa");
    const data = await getAllItems();
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setCartItems(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);
  return (
    <>
      <div className={s.background}>
        <Header />
        <div className="header-placeholder" />
        <div className="text-red-900 text-lg">
          {isLoaded !== null && cartItems ? (
            <>
              {cartItems.map((item) => {
                return (
                  <Fragment key={item._id}>
                    <div className="container mx-auto px-4 lg:max-w-screen-lg font-medium my-2">
                      <CartItemBig
                        productId={item.items[0].productId}
                        quantity={item.items[0].quantity}
                        itemId={item._id}
                        reloadCart={loadCart}
                      />
                    
                    <div className="border-b border-red-900/25 my-2" />
                    </div>
                  </Fragment>
                );
              })}
            </>
          ) : (
            <p className="text-center font-medium">V košíku nic nemáte</p>
          )}
        </div>
      </div>
    </>
  );
}
