import Link from "next/link";
import styled from "styled-components";
import Center from "../center/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import MenuIcon from "../icons/MenuIcon";
import SearchIcon from "../icons/SearchIcon";

/** style components */
const StyleHeader = styled.header`
  background-color: #283046;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  /** toggle the menu */
  ${(props) => (props.mobileNavActive ? "display: block;" : "display: none;")}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #222;
  padding: 70px 20px 20px;
  /** media queries for big screen */
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    background-color: #283046;
    padding: 0;
    
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  svg {
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
/** hamburger menu */
const Menu = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  position: relative;
  z-index: 3;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a{
    display: inline-block;
    min-width: 20px;
    color: white;
    svg{
      width: 14px;
      height: 14px;
    }
  }
`;
export default function Header() {
  /** application states */
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyleHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Accounts</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={"/search"}>
              <SearchIcon />
            </Link>
            {/* HAMBURGER MENU */}
            <Menu onClick={() => setMobileNavActive((prev) => !prev)}>
              <MenuIcon />
            </Menu>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyleHeader>
  );
}
