import { ProductContext } from "./ContextComponents/ProductContext";
import { useContext, useState } from "react";

const AdminPage = () => {
  const { products } = useContext(ProductContext);
  console.log(products);
  return <div>Hello Admin!</div>;
};

export default AdminPage;
