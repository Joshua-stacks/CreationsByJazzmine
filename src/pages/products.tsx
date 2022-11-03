import Link from 'next/link'
import { ProductContext } from "@/components/ContextComponents/ProductContext";
import { useContext, useState } from "react";
import styled from "styled-components";

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
                  <LinkProd href={`/product/${s._id}`} key={s}>
                    <ProdsDiv>
                      <ImgProd src={s.image_src} />
                      <Info>
                        <Name>{s.name}</Name>
                        <div>From {s.price}$</div>
                      </Info>
                    </ProdsDiv>
                  </LinkProd>
                </>
              );
            })
          : filteredProd.map((s) => {
              return (
                <>
                  <LinkProd href={`/product/${s._id}`}>
                    <ProdsDiv>
                      <ImgProd src={s.image_src} />
                      <Info>
                        <Name>{s.name}</Name>
                        <div>From {s.price}$</div>
                      </Info>
                    </ProdsDiv>
                  </LinkProd>
                </>
              );
            })}
      </ProdDiv>
    </Wrapper>
  );
};

const Name = styled.h1`
  font-size: larger;
`;
const Info = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LinkProd = styled(Link)`
  text-decoration: none;
  color: black;
`;
const ProdsDiv = styled.div`
  display: flex;
  border-bottom: solid 1px lightgray;
  padding: 5px;
`;
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
const ProdDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const ImgProd = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 15px;
`;

export default Products;
