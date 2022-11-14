import { ProductContext } from '@/components/ContextComponents/ProductContext';
import { useContext, useState } from 'react';
import { ProductProvider } from '@/components/ContextComponents/ProductContext';

const AdminPage = () => {
  const { products } = useContext(ProductContext);

  console.log(products);

  return (
    <ProductProvider>
      <div>Hello Admin!</div>
    </ProductProvider>
  );
};

export default AdminPage;
