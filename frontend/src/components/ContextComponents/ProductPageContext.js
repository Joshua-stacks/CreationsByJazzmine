import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductPageContext = createContext();

export const ProductPageProvider = ({ children }) => {
  //States
  const [product, setProduct] = useState();
  const [load, setLoad] = useState(false);
  const value = useParams();

  //fetching data
  useEffect(() => {
    const fetchProd = async () => {
      const data = await fetch(`/api/products/${value._id}`);
      const prod = await data.json();
      setLoad(true);
      setProduct(prod.product);
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
    <ProductPageContext.Provider value={{ product }}>
      {children}
    </ProductPageContext.Provider>
  );
};
