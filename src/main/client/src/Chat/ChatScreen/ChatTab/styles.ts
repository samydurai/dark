import styled from "styled-components";
import { secondaryColor } from "../../../Shared/theme";

export const StyledChatTab = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1 0 calc(100% - 48px);
  max-height: calc(100% - 48px);
`;

export const MessageContainer = styled.div`
  flex: 1 0 calc(100% - 58px);
  max-height: calc(100% - 58px);
  overflow-y: auto;
  scrollbar-color: hsla(0, 0%, 100%, 0.16) transparent;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${secondaryColor};
  }
  ::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;
