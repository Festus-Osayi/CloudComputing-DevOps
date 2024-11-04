import styled, { css } from "styled-components";
import { primary } from "@/lib/color";
export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  white-space: nowrap;

  svg {
    height: 16px;
  }
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
  /* buttons styling */
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      color: #fff;
      border: 1px solid ${primary};
    `}

  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
      &:hover {
        background-color: ${primary};
        color: #fff;
      }
    `}

    ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
    /* white buttons && outlines buttons*/
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
      &:hover {
        background-color: #fff;
        color: #000;
        border: 1px solid ${primary};
      }
    `}

    /* black buttons */
      /* white buttons && outlines buttons*/
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}

  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
      &:hover {
        background-color: #fff;
        color: #000;
        border: 1px solid ${primary};
      }
    `}
`;
const Button = styled.button`
  ${ButtonStyle};
`;
/** Buttons */
export default function Buttons({ children, ...rest }) {
  return <Button {...rest}>{children}</Button>;
}
