import { useContext, useState } from "react";
import styled from "styled-components";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { ProductPageContext } from "@/components/ContextComponents/ProductPageContext";
import { CartContext } from "@/components/ContextComponents/CartContext";
import { ProductPageProvider } from "@/components/ContextComponents/ProductPageContext";

const ProductPage = () => {
  const { product } = useContext(ProductPageContext);
  const { addCart } = useContext(CartContext);

  const [theme, setTheme] = useState("");
  const [count, setCount] = useState(product?.min);

  const keys = product && Object.keys(product.options);

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {};
    let custOption = "";
    for (let index = 0; index < event.target.length; index++) {
      const element = event.target[index];
      switch (element.type) {
        case "select-one":
          if (element.value !== "custom") {
            options[element.name] = element.value;
          } else {
            custOption = element.name;
          }
          break;
        case "text":
          options[custOption] = element.value;
          break;

        default:
          break;
      }
    }
    addCart(count, product, options);
  };

  return (
    <ProductPageProvider>
      {product && count !== undefined &&
      <Wrapper>
        <DivInfo>
          <Name>{product.name}</Name>
          <ProdImg src={product.image_src} />
        </DivInfo>
        <DiForm>
          <form onSubmit={handleSubmit}>
            {keys?.map((key, i) => (
              <>
                <DivOpt key={i}>
                  <KeySpan>{key}:</KeySpan>
                  <span>
                    {typeof product.options[key] === "boolean" ? (
                      <>
                        <label>
                          <select name={keys[i]} id={keys[i]}>
                            <option value={String(true)}>Yes</option>
                            <option value={String(false)}>No</option>
                          </select>
                        </label>
                      </>
                    ) : (
                      <>
                        <label>
                          <select
                            name={keys[i]}
                            onChange={(ev) => setTheme(ev.target.value)}
                            id={keys[i]}
                          >
                            <option>chose</option>
                            {/* TODO: fix type */}
                            {/* {product.options[key].map((element) => {
                              return (
                                <>
                                  <option value={element}>{element}</option>
                                </>
                              );
                            })} */}
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
      }
    </ProductPageProvider>
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
