import { Item } from '@/types/models';
import React, { createContext, useEffect, useState } from 'react';

export interface ICartProps {
  addCart: (count, product, options) => void;
  cart: Item[];
  handleClickMinus: any;
  handleClickPlus: any;
  handleDelete: any;
  numItem: any;

  total: number;
  setTotal: number;
}

export const CartContext = createContext<ICartProps>({} as ICartProps);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //States
  const [cart, setCart] = useState<Item[]>([]);
  const [load, setLoad] = useState(false);
  const [numItem, setNumItem] = useState(0);
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    if (cart) {
      const arrayPrice = cart.map((itm, index) => {
        const itms = itm.item;
        const num = cart[index].count;

        return Number((parseFloat(itms.price) * num).toFixed(2));
      });

      setTotal(arrayPrice.reduce((acc, value) => value + acc, 0));
    }
  }, [cart]);

  //fetching data
  useEffect(() => {
    const fetchProd = async () => {
      const data = await fetch('/api/cart');
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

  const addCart = (count: number, product, options) => {
    fetch('/api/cart/client', {
      method: 'POST',
      body: JSON.stringify({
        count: count,
        item: {
          ...product,
          options,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = '/cart';
      });
  };

  const handleClickMinus = (min, product) => {
    fetch('/api/cart/client', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
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
    fetch('/api/cart/client', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
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
    fetch('/api/cart/client', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
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
        total,
        setTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
