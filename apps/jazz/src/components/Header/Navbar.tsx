import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

import { Squash as Hamburger } from 'hamburger-react';

import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useContext } from 'react';

import { CartContext } from '@/components/ContextComponents/CartContext';

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);

  const { numItem } = useContext(CartContext);

  return (
    <Div>
      <Wrapper>
        <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        <>
          <Link href="/">
            <CompanyName>CreationsByJazzmine</CompanyName>
          </Link>
          <Link href="/cart">
            <Badge badgeContent={numItem}>
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </>
      </Wrapper>
      {isOpen && (
        <Dropdown>
          <Ul>
            <Link href="/">
              <Li onClick={() => setOpen(false)}>Home</Li>
            </Link>
            <Link href="/products">
              <Li onClick={() => setOpen(false)}>Shop</Li>
            </Link>
            <Link href="/orders">
              <Li onClick={() => setOpen(false)}>Find My Order</Li>
            </Link>
          </Ul>
        </Dropdown>
      )}
    </Div>
  );
};
const fadeIn = keyframes`
from {
    opacity: 0;
    transform: translatey(-2px)
}
to{
    opacity: 1;
}
`;
const fadeOut = keyframes`
from {
  opacity: 1;

}
to{
  opacity: 0;
    transform: translatey(-10px)
}
`;
const Div = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  padding-right: 10px;
  width: 100%;
  box-shadow: 12px 0 15px -4px var(--color-primary),
    -12px 0 8px -4px var(--color-primary);
  background-color: white;
  border-bottom: solid 1px lightgray;
`;

const CompanyName = styled.div`
  color: var(--color-primary);
  font-size: larger;
`;

const Dropdown = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  color: var(--color-primary);
  animation: ${fadeIn} 500ms;
`;

const Ul = styled.ul``;

const Li = styled.li`
  padding: 10px 0px 10px 10px;
`;
export default NavBar;
