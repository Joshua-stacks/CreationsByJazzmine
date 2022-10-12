import styled, { keyframes } from "styled-components";

import { Squash as Hamburger } from "hamburger-react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../components/ContextComponents/CartContext";

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  const { numItem } = useContext(CartContext);

  let navigate = useNavigate();

  return (
    <>
      <Wrapper>
        <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        {searchBar === false ? (
          <>
            <CompanyName
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
            >
              CreationsByJazzmine
            </CompanyName>
            <DivSearch>
              <AiOutlineSearch
                onClick={() => {
                  setSearchBar(true);
                }}
                size={25}
                style={{ padding: "12px" }}
              />
              <Badge
                badgeContent={numItem}
                onClick={() => {
                  navigate("/cart");
                  setOpen(false);
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </DivSearch>
          </>
        ) : (
          <>
            <SearchInput placeholder="Search for product" />
            <DivSearch>
              <MdCancel
                size={20}
                style={{ padding: "1px" }}
                onClick={() => {
                  setSearchBar(false);
                }}
              />
              <Badge
                badgeContent={4}
                onClick={() => {
                  navigate("/cart");
                  setOpen(false);
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </DivSearch>
          </>
        )}
      </Wrapper>
      {isOpen && (
        <Dropdown>
          <Ul>
            <Li
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
            >
              Home
            </Li>
            <Li
              onClick={() => {
                navigate("/products");
                setOpen(false);
              }}
            >
              Shop
            </Li>
            <Li
              onClick={() => {
                navigate("/orders");
                setOpen(false);
              }}
            >
              Find My Order
            </Li>
          </Ul>
        </Dropdown>
      )}
    </>
  );
};
const fadeIn = keyframes`
from {
    opacity: 0;
    transform: translatey(-10px)
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
const DivSearch = styled.div`
  margin-right: 7px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  width: 100%;
  overflow-x: hidden;
  border-bottom: solid 1px lightgray;
`;

const CompanyName = styled.div`
  color: var(--color-primary);
  font-size: larger;
  margin-left: 25px;
`;

const Dropdown = styled.div`
  position: absolute;
  background-color: #f2f2f2;
  width: 100%;
  color: var(--color-primary);
  animation: ${fadeIn} 500ms;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 7px;
`;

const Ul = styled.ul``;

const Li = styled.li`
  padding: 10px 0px 10px 10px;
`;
export default NavBar;
