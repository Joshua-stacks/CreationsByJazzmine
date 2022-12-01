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
      <div className="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 md:text-5xl lg:text-6xl">
        Party Decorations and More!
      </div>
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
