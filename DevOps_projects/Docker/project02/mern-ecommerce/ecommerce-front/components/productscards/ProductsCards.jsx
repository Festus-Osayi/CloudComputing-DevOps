import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import FlyingButton from "../reusable-styles/FlyingButton";
import HeartOutline from "../icons/HeartOutline";
import HeartSolid from "../icons/HeartSolid";
import axios from "axios";
import { formatPrice } from "@/lib/date";
const ProductWrapper = styled.div`
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;
const ProductDetails = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  padding: 10px;
`;
const ProductCardImages = styled.img`
  max-width: 100%;
  max-height: 80px;
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;

const ProductCardInfo = styled.div`
  margin-top: 5px;
`;

const Price = styled.div`
  font-weight: 400;
  font-size: 1rem;
  text-align: right;
  /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    font-weight: 600;
    font-size: 1.2rem;
    text-align: left;
  }
`;

const WishedListButton = styled.button`
  border: none;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  cursor: pointer;
  ${(props) =>
    props.wished
      ? `
  color: red;
  `
      : `   color: black;
      `}

  svg {
    width: 16px;
  }
`;

export default function ProductsCards({
  images,
  _id,
  title,
  description,
  price,
  wished = false,
  onRemoveFromWishList = () => {},
}) {
  /*************  application states ************/
  const [isWish, setIsWish] = useState(wished);
  /** Products Cards */

  /** functionality to add to wishlist */
  const handleAddToWishList = (e) => {
    e.preventDefault();
    const nextValue = !isWish;
    if(!nextValue && onRemoveFromWishList){
      onRemoveFromWishList(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWish(nextValue);
  };
  return (
    <ProductWrapper>
      <ProductDetails href={`/products/${_id}`}>
        <div>
          <WishedListButton wished={isWish} onClick={handleAddToWishList}>
            {isWish ? <HeartSolid /> : <HeartOutline />}
          </WishedListButton>
          <ProductCardImages src={images?.[0]} alt={title} />
        </div>
      </ProductDetails>
      <ProductCardInfo>
        <Title href={`/products/${_id}`}>{title}</Title>
        <PriceRow>
          <Price>{formatPrice(price)}</Price>

          <FlyingButton src={images?.[0]} _id={_id}>
            Add to cart
          </FlyingButton>
        </PriceRow>
      </ProductCardInfo>
    </ProductWrapper>
  );
}
