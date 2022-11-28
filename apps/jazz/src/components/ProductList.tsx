import { useContext } from 'react';
import {
  ProductContext,
} from '@/components/ContextComponents/ProductContext';

export default function ProductList() {
  const { products } = useContext(ProductContext);

  return (
    <div>
      Hey
    </div>
  );
}
