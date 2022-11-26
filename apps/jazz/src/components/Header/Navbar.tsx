import Link from 'next/link';

import { useState, useContext } from 'react';

import { CartContext } from '@/components/ContextComponents/CartContext';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  const { numItem } = useContext(CartContext);

  return (
    <>
      <div className='flex items-center justify-between h-14 w-full overflow-hidden border-b border-b-gray-100'>
        {/* <Hamburger toggled={isOpen} toggle={setOpen} size={20} /> */}
        {/* {searchBar === false ? (
          <>
            <Link href="/">
              <Logo />
            </Link>
            <DivSearch>
              <AiOutlineSearch
                onClick={() => {
                  setSearchBar(true);
                }}
                size={25}
                style={{ padding: '12px' }}
              />

              <Link href="/cart">
                <Badge badgeContent={numItem}>
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </DivSearch>
          </>
        ) : (
          <>
            <SearchInput placeholder="Search for product" />
            <DivSearch>
              <MdCancel
                size={20}
                style={{ padding: '1px' }}
                onClick={() => {
                  setSearchBar(false);
                }}
              />

              <Link href="/cart">
                <Badge badgeContent={numItem}>
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </DivSearch>
          </>
        )} */}
      </div>
      {/* {isOpen && (
        <Dropdown>
          <ul>
            <Link href="/">
              <Li onClick={() => setOpen(false)}>Home</Li>
            </Link>

            <Link href="/products">
              <Li onClick={() => setOpen(false)}>Shop</Li>
            </Link>

            <Link href="/orders">
              <Li onClick={() => setOpen(false)}>Find My Order</Li>
            </Link>
          </ul>
        </Dropdown>
      )} */}
    </>
  );
};

/* const fadeIn = keyframes` */
/* from { */
/*     opacity: 0; */
/*     transform: translatey(-10px) */
/* } */
/* to{ */
/*     opacity: 1; */
/* } */
/* `; */
/* const fadeOut = keyframes` */
/* from { */
/*   opacity: 1; */
/**/
/* } */
/* to{ */
/*   opacity: 0; */
/*     transform: translatey(-10px) */
/* } */
/* `; */
/* const DivSearch = styled.div` */
/*   margin-right: 7px; */
/*   display: flex; */
/*   align-items: center; */
/* `; */
/**/
/* const Wrapper = styled.div` */
/*   display: flex; */
/*   align-items: center; */
/*   justify-content: space-between; */
/*   height: 55px; */
/*   width: 100%; */
/*   overflow-x: hidden; */
/*   border-bottom: solid 1px lightgray; */
/* `; */
/**/
/* const Dropdown = styled.div` */
/*   position: absolute; */
/*   background-color: #f2f2f2; */
/*   width: 100%; */
/*   color: var(--color-primary); */
/*   animation: ${fadeIn} 500ms; */
/* `; */
/**/
/* const SearchInput = styled.input` */
/*   width: 200px; */
/*   padding: 7px; */
/* `; */
/**/
/* const Li = styled.li` */
/*   padding: 10px 0px 10px 10px; */
/* `; */
