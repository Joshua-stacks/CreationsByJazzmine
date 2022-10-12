import styled from "styled-components";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { CartContext } from "../components/ContextComponents/CartContext";

import { useContext } from "react";

const Cart = () => {
  const { cart } = useContext(CartContext);
  console.log(cart);

  return (
    <>
      {cart.length !== 0 ? (
        <>
          {cart.map((itm) => {
            const itms = itm.item;
            return (
              <>
                <Wrapper key={itm}>
                  <div>{itms.name}</div>
                  <div>From {itms.category}</div>
                  <Edit>
                    <ImgProd src={itms.image_src} />
                  </Edit>
                </Wrapper>
              </>
            );
          })}
        </>
      ) : (
        <>Cart is empty</>
      )}
    </>
  );
};
const Wrapper = styled.div`
  border: solid 1px lightgray;
  border-radius: 15px;
  margin: 10px;
  padding: 10px;
`;
const ImgProd = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  box-shadow: 5px 5px lightgray;
`;
const Edit = styled.div``;

export default Cart;
