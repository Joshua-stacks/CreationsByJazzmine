import {
  ProductContext,
  ProductProvider,
} from '@/components/ContextComponents/ProductContext';
import { useContext } from 'react';

import styled from 'styled-components';

export default function Home() {
  const { products } = useContext(ProductContext);
  return (
    <div>
      <div className="m-5 text-lg">Welcome</div>
      <div className="bg-red-500">
        <h1>About</h1>A family business created out of passion for personalized
        parties. When we created creations by Jazzmine Rose, we did not know all
        the adventures it would takes us on. We continue this great adventure
        making sure your ideas are our creations
      </div>
    </div>
  );
}
Home.getLayout = (page) => {
  return <ProductProvider>{page}</ProductProvider>;
};
