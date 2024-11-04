import styled from "styled-components";
import { CartContext } from "@/context/CartContext";
import { useContext, useEffect, useRef, useState } from "react";
import { ButtonStyle } from "../buttons/Buttons";
import { primary } from "@/lib/color";
import { css } from "styled-components";

/** styling */
const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
    ${(props) =>
      props.main
        ? `
    background-color: ${primary};
    color: #fff;
    `
        : `
        background-color: transparent;
        border: 1px solid ${primary};
        color: ${primary};
        &:hover {
            background-color: ${primary};
            color: #fff;
            }
        `}
    ${(props) =>
      props.white &&
      `
    background-color: #fff;
    color: #000;
    border: 1px solid #fff;
    `}

    ${(props) =>
      props.size === "l" &&
      css`
        font-size: 1.2rem;
        padding: 10px 20px;
        svg {
          height: 20px;
          margin-right: 5px;
        }
      `}
  }
`;
const Images = styled.img`
  @keyframes fly {
    100% {
      top: 0;
      left: 100%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  max-width: 100px;
  max-height: 100px;
  opacity: 1;
  position: fixed;
  display: none;
  z-index: 5;
  animation: fly 1s;
  border-radius: 10px;
`;
export default function FlyingButton(props) {
  /** application state */
  const { addToProducts } = useContext(CartContext);
  const imageRef = useRef();

  /** functionality to send the image to cart */
  const sendImageToCart = (e) => {
    imageRef.current.style.display = "inline-block";
    imageRef.current.style.left = e.clientX - 50 + "px";
    imageRef.current.style.top = e.clientY - 50 + "px";
    setTimeout(() => {
      imageRef.current.style.display = "none";
    }, 1000);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      /** get all the closest div, with the
       * data attribute of (data-sr-id)
       * check the opacity level
       */
      const reveal = imageRef?.current?.closest("div[data-sr-id]");

      if (reveal?.style?.opacity === "1") {
        reveal.style.transform = "none";
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <FlyingButtonWrapper
        main={props.main}
        white={props.white}
        size={props.size}
        onClick={() => addToProducts(props._id)}
      >
        <Images src={props.src} alt={props.title} ref={imageRef} />
        <button {...props} onClick={(e) => sendImageToCart(e)} />
      </FlyingButtonWrapper>
    </>
  );
}
