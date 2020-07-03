import styled from "styled-components";
import ChatScreen from "./ChatScreen";
import WatchList from "./WatchList";

export const ChatPage = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
`;

export const StyledChatScreen = styled(ChatScreen)`
  flex: 0 0 80%;
  display: flex;
  flex-flow: column;
  max-width: 80%;
`;

export const StyledWatchList = styled(WatchList)`
  flex: 0 0 20%;
  height: 100%;
  max-width: 20%;
`;
