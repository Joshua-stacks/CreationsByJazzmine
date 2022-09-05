import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const NavBar = () => {
   const [isOpen, setOpen] = useState(false);

   return (
      <>
         <Wrapper>
            <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
            <CompanyName>CreationsByJazzmine</CompanyName>
            <AiOutlineSearch size={25} style={{ padding: "12px" }} />
         </Wrapper>
         <Dropdown></Dropdown>
      </>
   );
};

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const CompanyName = styled.div`
   color: var(--color-primary);
`;

const Dropdown = styled.div``;

export default NavBar;
