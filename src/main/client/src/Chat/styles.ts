import styled from "styled-components";
import ChatScreen from "./ChatScreen";

export const ChatPage = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
`;

export const StyledChatScreen = styled(ChatScreen)`
  flex: 1 0 80%;
  display: flex;
  flex-flow: column;
  max-width: 80%;
`;
