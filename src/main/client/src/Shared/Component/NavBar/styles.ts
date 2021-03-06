import styled from "styled-components";
import { primaryColor } from "../../theme";

const NavPage = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
`;

const ComponentContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 64px);
`;

const StyledTitle = styled.div`
  flex-grow: 1;
  font-size: 1.5em;
  color: ${primaryColor};
  font-family: "Monoton", cursive;
`;

export { NavPage, ComponentContainer, StyledTitle };
