import { useState } from "react";
import styled from "styled-components";

/** styling */
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const ImageButton = styled.div`
 
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ImageWrapper = styled.div`
  text-align: center;
`;
const BigImage = styled.img`
  max-width: 100%;
  height: 200px;
`;

export default function ProductImage({ images, description }) {
  /** application state, to check active image state */
  const [activeImage, setActiveImage] = useState(images?.[0] || "");
  return (
    <>
      <ImageWrapper>
        <BigImage src={activeImage} alt={description} />
      </ImageWrapper>
      <ImageButtons>
        {images.length > 0 &&
          images?.map((image) => (
            <ImageButton
              active
              key={image}
              onClick={() => setActiveImage(image)}
            >
              <Image src={image} alt="" />
            </ImageButton>
          ))}
      </ImageButtons>
    </>
  );
}
