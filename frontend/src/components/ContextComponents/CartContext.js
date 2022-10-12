import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //States
  const [cart, setCart] = useState();
  const [load, setLoad] = useState(false);
  const [numItem, setNumItem] = useState(0);

  //fetching data
  useEffect(() => {
    const fetchProd = async () => {
      const data = await fetch("/api/cart");
      const prod = await data.json();
      setCart(prod.data);
      setLoad(true);
      if (prod.data !== undefined) {
        const num = prod.data.reduce((sum, acc) => sum + acc.count, 0);
        setNumItem(num);
      }
      return prod;
    };
    fetchProd().catch((err) => {
      console.log(err);
    });
  }, []);
  //Loading data
  if (!load) {
    return <></>;
  }

  const addCart = (count, product, options) => {
    fetch("/api/cart/client", {
      method: "POST",
      body: JSON.stringify({
        count: count,
        item: {
          ...product,
          options,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "/cart";
      });
  };

  //return provider
  return (
    <CartContext.Provider value={{ cart, numItem, addCart }}>
      {children}
    </CartContext.Provider>
  );
};
