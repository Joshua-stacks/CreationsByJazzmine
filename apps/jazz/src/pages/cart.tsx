import Link from 'next/link';
import { CartContext } from '@/components/ContextComponents/CartContext';

import { useContext, useState } from 'react';
import Image from 'next/image';

const Cart = () => {
  const { cart, handleClickMinus, handleClickPlus, handleDelete, total } =
    useContext(CartContext);

  return (
    <>
      <h1 className="text-4xl font-extrabold">Your cart</h1>

      {cart && cart.length !== 0 ? (
        <>
          {cart.map((itm, index) => {
            const itms = itm.item;
            const num = cart[index].count;
            return (
              <div
                className="border border-gray-100 rounded-2xl m-2.5 p-2.5"
                key={itm.item.name}
              >
                <div>{itms.name}</div>
                <div>From {itms.category}</div>
                <div className="flex items-center justify-between mt-2">
                  <Image
                    className="w-48 h-48 rounded-2xl shadow"
                    src={itms.image_src}
                    alt={itm.item.name}
                  />
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <button
                        className="m-2.5 rounded-2xl bg-white border"
                        disabled={num === itms.min}
                        onClick={() => handleClickMinus(num, itms)}
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <div>{num}</div>
                      <button
                        className="m-2.5 rounded-2xl bg-white border"
                        disabled={num === itms.max}
                        onClick={() => handleClickPlus(num, itms)}
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                    <button type="button" onClick={() => handleDelete(itms)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="border-t p-1 mt-4 mr-1 mb-1 ml-1 flex justify-between">
                  <div>Est. Price</div>
                  <div>{(parseFloat(itms.price) * num).toFixed(2)}$</div>
                </div>
              </div>
            );
          })}
          <div className="text-lg font-bold flex justify-between border rounded-2xl m-2.5 p-2.5">
            <div>Est. Total Price</div>
            <div>{total.toFixed(2)}$</div>
          </div>
          <div className="flex justify-center mb-4">
            <Link href={'/quote'}>
              <div className="text-lg bg-primary text-white border-none rounded-2xl p-2.5">
                Get a quote
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>Cart is empty</>
      )}
    </>
  );
};

export default Cart;
