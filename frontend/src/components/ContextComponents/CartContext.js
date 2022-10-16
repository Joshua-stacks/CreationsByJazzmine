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

  const handleClickMinus = (min, product) => {
    fetch("/api/cart/client", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        count: min - 1,
        item: { ...product },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data);
      });
  };
  const handleClickPlus = (max, product) => {
    fetch("/api/cart/client", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        count: max + 1,
        item: { ...product },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data);
      });
  };

  const handleDelete = (product) => {
    fetch("/api/cart/client", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ item: { ...product } }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data);
      });
  };

  //return provider
  return (
    <CartContext.Provider
      value={{
        cart,
        numItem,
        addCart,
        handleClickMinus,
        handleClickPlus,
        handleDelete,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
