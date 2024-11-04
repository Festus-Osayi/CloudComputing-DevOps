import styled from "styled-components";

const StyledTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledSpan = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `color: red; border-bottom: 2px solid black;`
      : `color: #999`}
`;
export default function Tabs({ tabs, active, onChange }) {
  return (
    <StyledTabs>
      {tabs.length > 0 &&
        tabs.map((tabName) => (
          <StyledSpan
            active={active === tabName}
            key={tabName}
            onClick={() => {
              onChange(tabName);
            }}
          >
            {tabName}
          </StyledSpan>
        ))}
    </StyledTabs>
  );
}
