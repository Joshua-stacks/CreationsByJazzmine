import Link from 'next/link'
import styled from "styled-components";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { CartContext } from "@/components/ContextComponents/CartContext";

import { useContext } from "react";

const Cart = () => {
  const { cart, handleClickMinus, handleClickPlus, handleDelete } =
    useContext(CartContext);

  let arrayPrice = cart.map((itm, index) => {
    const itms = itm.item;
    const num = cart[index].count;
    return Number((parseFloat(itms.price) * num).toFixed(2));
  });
  let total = arrayPrice.reduce((acc, value) => value + acc, 0);

  return (
    <>
      <Title>Your cart</Title>
      {cart.length !== 0 ? (
        <>
          {cart.map((itm, index) => {
            const itms = itm.item;
            const num = cart[index].count;
            return (
              <Wrapper key={itm}>
                <div>{itms.name}</div>
                <div>From {itms.category}</div>
                <Edit>
                  <ImgProd src={itms.image_src} />
                  <DivAll>
                    <DivPlusMin>
                      <QtyButton
                        disabled={num === itms.min}
                        onClick={() => handleClickMinus(num, itms)}
                        type="button"
                      >
                        <RemoveIcon />
                      </QtyButton>
                      <div>{num}</div>
                      <QtyButton
                        disabled={num === itms.max}
                        onClick={() => handleClickPlus(num, itms)}
                        type="button"
                      >
                        <AddIcon />
                      </QtyButton>
                    </DivPlusMin>
                    <DeleteIcon onClick={() => handleDelete(itms)} />
                  </DivAll>
                </Edit>
                <ItemPrice>
                  <div>Est. Price</div>
                  <div>{(parseFloat(itms.price) * num).toFixed(2)}$</div>
                </ItemPrice>
              </Wrapper>
            );
          })}
          <TotalPrice>
            <div>Est. Total Price</div>
            <div>{total}$</div>
          </TotalPrice>
          <DivQuote>
            <Link href={"/quote"}>
              <ButtonQuote>Get a quote</ButtonQuote>
            </Link>
          </DivQuote>
        </>
      ) : (
        <>Cart is empty</>
      )}
    </>
  );
};
const ButtonQuote = styled.button`
  font-size: large;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px;
`;
const DivQuote = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;
const Wrapper = styled.div`
  border: solid 1px lightgray;
  border-radius: 15px;
  margin: 10px;
  padding: 10px;
`;
const Title = styled.div`
  margin: 10px 0px;
  font-size: 30px;
  padding: 5px 10px;
  padding-right: 30px;
  border-bottom: solid;
  width: fit-content;
  font-weight: bold;
`;
const TotalPrice = styled.div`
  font-size: larger;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  border: solid 1px lightgray;
  border-radius: 15px;
  margin: 10px;
  padding: 10px;
`;
const ItemPrice = styled.div`
  border-top: solid 1px lightgray;
  padding: 5px;
  margin: 15px 5px 5px 5px;
  display: flex;
  justify-content: space-between;
`;
const ImgProd = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  box-shadow: 5px 5px lightgray;
`;
const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
`;
const QtyButton = styled.button`
  margin: 10px;
  border-radius: 15px;
  background-color: white;
  border: 1px solid;
`;
const DivPlusMin = styled.div`
  display: flex;
  align-items: center;
`;
const DivAll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Cart;
