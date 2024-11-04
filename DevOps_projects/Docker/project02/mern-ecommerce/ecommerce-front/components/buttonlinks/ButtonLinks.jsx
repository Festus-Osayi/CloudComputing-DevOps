import Link from "next/link";
import { ButtonStyle } from "../buttons/Buttons";
import styled from "styled-components";

const StyledButtonLinks = styled(Link)`
  ${ButtonStyle}
`;
export default function ButtonLinks(props) {
  return <StyledButtonLinks {...props} />;
}
