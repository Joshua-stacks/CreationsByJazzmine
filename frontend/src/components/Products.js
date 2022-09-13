import { ProductContext } from "./ContextComponents/ProductContext";
import { useContext, useState } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";

const Products = () => {
  const { products } = useContext(ProductContext);

  const [selectedCat, setSelectedCat] = useState("All");

  const categories = [...new Set(products.map((x) => x.category))];

  const filteredProd = products.filter((d) => d.category === selectedCat);

  return (
    <Wrapper>
      <CatSelector>
        <ButtonCat
          value="All"
          onClick={(ev) => setSelectedCat(ev.target.value)}
        >
          All
        </ButtonCat>
        {categories.map((cat) => {
          return (
            <ButtonCat
              value={cat}
              onClick={(ev) => setSelectedCat(ev.target.value)}
            >
              {cat}
            </ButtonCat>
          );
        })}
      </CatSelector>
      <ProdDiv>
        {selectedCat === "All"
          ? products.map((s) => {
              return (
                <>
                  <ImgProd src={s.image_src} />
                </>
              );
            })
          : filteredProd.map((l) => {
              return (
                <>
                  <ImgProd src={l.image_src} />
                </>
              );
            })}
      </ProdDiv>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

const CatSelector = styled.div`
  display: flex;
  overflow-x: scroll;
  border-bottom: solid lightgray 1px;
  padding-bottom: 5px;
`;

const ButtonCat = styled.button`
  margin: 5px 10px;
  background: none;
  border-radius: 5px;
  border: 1px solid;
`;
const ProdDiv = styled.div``;
const ImgProd = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

export default Products;
