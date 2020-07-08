import styled from "styled-components";

import { onBackgroundDisabled } from "../../../Shared/theme";

export const EmptyDiv = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
`;

export const EmptyMessage = styled.span`
  text-align: center;
  color: ${onBackgroundDisabled};
`;
