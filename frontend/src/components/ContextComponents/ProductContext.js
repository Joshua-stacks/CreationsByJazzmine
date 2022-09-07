import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  //States
  const [products, setProducts] = useState();
  const [load, setLoad] = useState(false);

  //fetching data
  useEffect(() => {
    const fetchProd = async () => {
      const data = await fetch("/api/products");
      const prod = await data.json();
      setLoad(true);
      setProducts(prod.products);
      return prod;
    };
    fetchProd().catch((err) => {
      console.log(err);
    });
  }, []);
  //Loading data
  if (!load) {
    return <>loading product</>;
  }

  //return provider
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
