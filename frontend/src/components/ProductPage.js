import { useContext, useState } from "react";
import styled from "styled-components";
import { Radio } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { ProductPageContext } from "./ContextComponents/ProductPageContext";

const ProductPage = () => {
  const { product } = useContext(ProductPageContext);

  const [theme, setTheme] = useState("");
  const [count, setCount] = useState(product.min);

  const keys = Object.keys(product.options);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    fetch("/api/cart/client");
  };

  return (
    <>
      <Wrapper>
        <DivInfo>
          <Name>{product.name}</Name>
          <ProdImg src={product.image_src} />
        </DivInfo>
        <DiForm>
          <form onSubmit={handleSubmit}>
            {keys.map((key, i) => (
              <>
                <DivOpt key={i}>
                  <KeySpan>{key}:</KeySpan>
                  <span>
                    {typeof product.options[key] === "boolean" ? (
                      <>
                        <label>
                          <select name="boolean" id={keys[i]}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        </label>
                      </>
                    ) : (
                      <>
                        <label>
                          <select onChange={(ev) => setTheme(ev.target.value)}>
                            <option>chose</option>
                            {product.options[key].map((element) => {
                              return (
                                <>
                                  <option value={element}>{element}</option>
                                </>
                              );
                            })}
                          </select>
                          <div style={{ marginTop: "5px" }}>
                            {theme === "custom" && (
                              <input placeholder="Please write custom theme" />
                            )}
                          </div>
                        </label>
                      </>
                    )}
                  </span>
                </DivOpt>
              </>
            ))}
            <QtyDiv>
              <div>
                <QtyButton
                  disabled={count === product.min}
                  onClick={() => setCount(count - 1)}
                  type="button"
                >
                  <RemoveIcon />
                </QtyButton>
                <span style={{ fontSize: "20px" }}>{count}</span>
                <QtyButton
                  disabled={count === product.max}
                  onClick={() => setCount(count + 1)}
                  type="button"
                >
                  <AddIcon />
                </QtyButton>
              </div>
              <div>
                min:{product.min} max:{product.max}
              </div>
            </QtyDiv>
            <AddCart type="submit">add to cart</AddCart>
            <Pricing>
              <div style={{ marginBottom: "10px" }}>{product.price}$/each</div>
              <div>
                <b>
                  Total:
                  {(parseFloat(product.price) * count).toFixed(2)}$
                </b>
              </div>
            </Pricing>
          </form>
        </DiForm>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const DiForm = styled.div`
  margin: 10px;
`;

const AddCart = styled.button`
  font-size: larger;
  margin-top: 5px;
  background-color: white;
  border-radius: 15px;
  padding: 5px;
`;
const Pricing = styled.div`
  width: fit-content;
  float: right;
`;
const DivInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.h1`
  font-size: 25px;
  margin: 10px;
`;

const ProdImg = styled.img`
  width: 325px;
  margin: 10px;
  border-radius: 15px;
  box-shadow: 5px 5px lightgray;
`;

const KeySpan = styled.span`
  font-size: 20px;
  margin-right: 5px;
`;

const DivOpt = styled.div`
  margin: 10px 0px;
`;

const QtyButton = styled.button`
  margin: 10px;
  border-radius: 15px;
  background-color: white;
  border: 1px solid;
`;

const QtyDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  margin-bottom: 10px;
  font-size: 13px;
`;

export default ProductPage;
