import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IProduct } from '@/types/models';

export interface IProductPageProps {
  product?: IProduct;
}

export const ProductPageContext = createContext<IProductPageProps>(
  {} as IProductPageProps
);

export const ProductPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //States
  const [product, setProduct] = useState();
  const [load, setLoad] = useState(false);

  const router = useRouter();
  const { productId } = router.query;

  //fetching data
  useEffect(() => {
    const fetchProd = async () => {
      const data = await fetch(`/api/products/${productId}`);
      const prod = await data.json();
      setLoad(true);
      setProduct(prod.product);
      return prod;
    };

    if (productId) {
      fetchProd().catch((err) => {
        console.log(err);
      });
    }
  }, [productId]);
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
