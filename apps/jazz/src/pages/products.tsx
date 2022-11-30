import Link from 'next/link';
import { useState } from 'react';
import { NextPageWithLayout } from './_app';
import ProductList from '@/components/ProductList';
import Image from 'next/image';

const Products: NextPageWithLayout<{ products: any[] }> = ({ products }) => {
  const [category, setCategory] = useState('All');

  /* const categories = ['All', ...new Set(products?.map((x) => x.category))]; */

  /* const filteredProd = products?.filter((d) => d.category === selectedCat); */

  return (
    <div className='flex flex-col'>

      <div className='flex flex-col'>
        <h1 className='text-3xl font-extrabold dark:text-white'>Best Sellers</h1>

        <div className='overflow-x-auto mt-5 flex md:grid md:grid-cols-6 md:auto-rows-auto'>
          {products.map(({ name, _id: id, image_src }) => (
            <Link
              key={id}
              href='/'
              className='relative flex flex-col items-center p-2 w-full'
            >
              <div className='relative w-36 h-36'>
                <Image
                  className='rounded-xl object-contain'
                  src={image_src}
                  alt={name}
                  fill
                />
              </div>
              <span className='text-base dark:text-white'>
                {name}
              </span>

              <div className='absolute -top-0.5 -right-0.5 p-1 rounded-xl bg-red-500'>
                <span className='text-xs font-bold'>
                  17% Off
                </span>
              </div>

            </Link>
          ))}
        </div>
      </div>

      <div className='flex flex-col'>
        <h1 className='text-3xl font-extrabold dark:text-white'>Catalog</h1>

      </div>

    </div>
  );
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const products = await getMongoProducts();
  console.log(products);

  return {
    props: {
      products
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}

const getStrapiProducts = async () => {
  const response = await fetch('http://localhost:1337/api/products?populate=media');
  const { data: products } = await response.json();

  return products;
};

const getMongoProducts = async () => {
  const data = await fetch('http://localhost:3000/api/products');
  const { products } = await data.json();

  return products;
};

{/* {selectedCat === 'All'
          ? products?.map((s) => {
              return (
                <LinkProd href={`/product/${s._id}`} key={s.name}>
                  <ProdsDiv>
                    <ImgProd src={s.image_src} />
                    <Info>
                      <Name>{s.name}</Name>
                      <div>From {s.price}$</div>
                    </Info>
                  </ProdsDiv>
                </LinkProd>
              );
            })
          : filteredProd?.map((s) => {
              return (
                <LinkProd href={`/product/${s._id}`} key={s.name}>
                  <ProdsDiv>
                    <ImgProd src={s.image_src} />
                    <Info>
                      <Name>{s.name}</Name>
                      <div>From {s.price}$</div>
                    </Info>
                  </ProdsDiv>
                </LinkProd>
              );
            })} */}

/* Products.getLayout = (page) => { */
/*   return <ProductProvider>{page}</ProductProvider>; */
/* }; */

/* const Name = styled.h1`
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

const ButtonCat = styled.button<{ selected: boolean }>`
  margin: 5px 10px;
  background: none;
  border-radius: 5px;
  border: 1px solid;
  background-color: ${(props) => (props.selected ? 'green' : 'inherit')};
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
`; */

export default Products;
