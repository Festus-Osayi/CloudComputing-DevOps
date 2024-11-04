import styled from "styled-components";
import StarsOutline from "../icons/StarsOutline";
import StarsSolid from "../icons/StarsSolid";
import { useState } from "react";
import React from "react";
import { primary } from "@/lib/color";

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 3px;
  align-items: center;
`;
const StarWrapper = styled.button`
  ${(props) =>
    props.size === "md"
      ? ` height: 1.4rem;
  width: 1.4rem;`
      : ` height: 1rem;
  width: 1rem;`}
  cursor: pointer;
  border: none;
  padding: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
  ${(props) => props.disabled && "cursor: default;"}
`;
export default function StarsRating({
  defaultRating = 0,
  disabled = false,
  onChange = () => {},
  size = "md",
}) {
  /********** application states **********/
  const [rating, setRating] = useState(defaultRating);

  /** functionality to handle the rating */
  function handleStarClick(n) {
    /** disable the review buttons after submission */
    if (disabled) {
      return;
    }
    setRating(n);
    onChange(n);
  }
  return (
    <StarsWrapper>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((num, i) => (
        <React.Fragment key={i}>
          <StarWrapper
            size={size}
            disabled={disabled}
            onClick={() => handleStarClick(num)}
          >
            {rating >= num ? <StarsSolid /> : <StarsOutline />}
          </StarWrapper>
        </React.Fragment>
      ))}
    </StarsWrapper>
  );
}
