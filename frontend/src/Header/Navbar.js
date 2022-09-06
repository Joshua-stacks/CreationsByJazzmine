import styled from "styled-components";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Squash as Hamburger } from "hamburger-react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

const NavBar = () => {
   const [isOpen, setOpen] = useState(false);
   const [searchBar, setSearchBar] = useState(false);

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
                     }}
                  >
                     CreationsByJazzmine
                  </CompanyName>
                  <AiOutlineSearch
                     onClick={() => {
                        setSearchBar(true);
                     }}
                     size={25}
                     style={{ padding: "12px" }}
                  />
               </>
            ) : (
               <>
                  <SearchInput placeholder="Search for product" />
                  <MdCancel
                     size={20}
                     style={{ padding: "12px" }}
                     onClick={() => {
                        setSearchBar(false);
                     }}
                  />
               </>
            )}
         </Wrapper>
         {isOpen && (
            <Dropdown>
               <Ul>
                  <Li
                     onClick={() => {
                        navigate("/products");
                        setOpen(false);
                     }}
                  >
                     Products
                  </Li>
                  <Li
                     onClick={() => {
                        navigate("/about");
                        setOpen(false);
                     }}
                  >
                     About Us
                  </Li>
               </Ul>
            </Dropdown>
         )}
      </>
   );
};

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 55px;
`;

const CompanyName = styled.div`
   color: var(--color-primary);
`;

const Dropdown = styled.div`
   position: absolute;
   background-color: #f2f2f2;
   width: 100%;
   color: var(--color-primary);
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
