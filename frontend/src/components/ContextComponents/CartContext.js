import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //States
  const [cart, setCart] = useState();
  const [load, setLoad] = useState(false);

  //fetching data
  useEffect(() => {
    const fetchProd = async () => {
      const data = await fetch("/api/cart");
      const prod = await data.json();
      setLoad(true);
      setCart(prod.data);
      return prod;
    };
    fetchProd().catch((err) => {
      console.log(err);
    });
  }, []);
  //Loading data
  if (!load) {
    return <>loading products</>;
  }

  const addToCart = () => {};

  //return provider
  return (
    <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
  );
};
