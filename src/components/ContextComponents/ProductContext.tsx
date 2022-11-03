import { createContext, useEffect, useState } from "react";

export interface IProductOptions {
  [key: string]: string[] | boolean;
}

export interface IProduct {
  name: string;
  category: string;
  price: string;
  image_src: string;
  min: number;
  max: number;
  options: IProductOptions;
  _id: string;
}
export interface IProductProps {
  products?: IProduct[];
}

export const ProductContext = createContext<IProductProps>({} as IProductProps);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    return <>loading products</>;
  }

  //return provider
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
