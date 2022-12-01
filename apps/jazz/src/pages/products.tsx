import Link from 'next/link';
import {
  ProductContext,
  ProductProvider,
} from '@/components/ContextComponents/ProductContext';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { NextPageWithLayout } from './_app';
import { WindowSharp } from '@mui/icons-material';
import Image from 'next/image';

const Products: NextPageWithLayout = () => {
  const { products } = useContext(ProductContext);

  const [selectedCat, setSelectedCat] = useState('All');
  const [slice, setSlice] = useState(5);

  const categories = ['All', ...new Set(products?.map((x) => x.category))];

  const filteredProd = products?.filter((d) => d.category === selectedCat);

  const handleClick = () => {
    if (products !== undefined) {
      if (slice < products?.length) {
        setSlice(slice + 5);
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <Wrapper>
      <CatSelector>
        {categories.map((cat) => {
          return (
            <ButtonCat
              key={cat}
              value={cat}
              onClick={(ev) => setSelectedCat((ev.target as any).value)}
              selected={selectedCat === cat}
            >
              {cat}
            </ButtonCat>
          );
        })}
      </CatSelector>
      <ProdDiv>
        {selectedCat === 'All'
          ? products?.slice(0, slice).map((s) => {
              return (
                <>
                  <LinkProd href={`/product/${s._id}`} key={s.name}>
                    <div className="flex flex-col p-5 justify-center items-center border-4">
                      <div className="flex flex-col border">
                        <div className="relative w-80 h-80">
                          <Image
                            className="rounded-xl "
                            src={s.image_src}
                            alt={s.name}
                            fill
                          />
                        </div>
                        <div className="flex items-center align-middle justify-between">
                          <div>
                            <div className="font-bold text-lg">{s.name}</div>
                            <div className="italic">{s.category}</div>
                          </div>
                          <div
                            className="font-semibold text-2xl"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            ${s.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </LinkProd>
                </>
                // <LinkProd href={`/product/${s._id}`} key={s.name}>
                //   <ProdsDiv>
                //     <ImgProd src={s.image_src} />
                //     <Info>
                //       <Name className=''>{s.name}</Name>
                //       <div>From {s.price}$</div>
                //     </Info>
                //   </ProdsDiv>
                // </LinkProd>
              );
            })
          : filteredProd?.map((s) => {
              return (
                <></>
                // <LinkProd href={`/product/${s._id}`} key={s.name}>
                //   <ProdsDiv>
                //     <ImgProd src={s.image_src} />
                //     <Info>
                //       <Name>{s.name}</Name>
                //       <div>From {s.price}$</div>
                //     </Info>
                //   </ProdsDiv>
                // </LinkProd>
              );
            })}
      </ProdDiv>
      <Div>
        {products !== undefined && slice < products?.length ? (
          <Button
            onClick={handleClick}
            style={
              selectedCat === 'All' ? { display: 'block' } : { display: 'none' }
            }
          >
            Load More
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            style={
              selectedCat === 'All' ? { display: 'block' } : { display: 'none' }
            }
          >
            Back to top
          </Button>
        )}
      </Div>
    </Wrapper>
  );
};

Products.getLayout = (page) => {
  return <ProductProvider>{page}</ProductProvider>;
};

const Div = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  background-color: var(--color-primary);
  width: fit-content;
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  color: white;
`;
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
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CatSelector = styled.div`
  display: flex;
  overflow-x: scroll;
  border-bottom: solid lightgray 1px;
  padding-bottom: 5px;
`;

const ButtonCat = styled.button<{ selected: boolean }>`
  margin: 5px 10px;
  background: none;
  border-radius: 5px;
  border: 1px solid;
  padding: 5px 10px;
  background-color: ${(props) =>
    props.selected ? 'var(--color-primary)' : 'inherit'};
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
