import { BounceLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `
display: flex;
justify-content: center;
`
      : `
border: 5px solid black;
`}
`;
export default function Spinner({ fullWidth }) {
  /** spinner */
  return (
    <Wrapper fullWidth={fullWidth}>
      <BounceLoader speedMultiplier={3} color="#555" />
    </Wrapper>
  );
}
