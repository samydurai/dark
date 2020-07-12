import styled from "styled-components";

import Drawer from "@material-ui/core/Drawer";

import { backgroundColorElevation } from "../../theme";

export const StyledWatchList = styled.div`
  flex: 0 0 20%;
  height: 100%;
  max-width: 20%;
  border-left: 1px solid ${backgroundColorElevation};
  max-height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

export const StyledOpenButton = styled.div`
  flex: 0 1 auto;
  height: 100%;
  border-left: 1px solid ${backgroundColorElevation};
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const ButtonText = styled.div`
  padding: 5px;
  writing-mode: vertical-rl;
`;

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    max-width: 80vw;
  }
`;
