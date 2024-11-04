import styled from "styled-components";
import ProductsCards from "../productscards/ProductsCards";
import { RevealWrapper } from "next-reveal"; /** animations */

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
export default function ProductsGrid({ products, wishedProducts }) {
  return (
    <StyledProductGrid interval={100}>
      {products.length > 0 &&
        products.map((product, index) => (
          /** map through all the new products
           *  and render them with the products card
           * components *
           */
          <RevealWrapper key={product._id} delay={index * 50}>
            <ProductsCards
              {...product}
              wished={wishedProducts?.includes(product._id)}
            />
          </RevealWrapper>
        ))}
    </StyledProductGrid>
  );
}
