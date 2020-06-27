import * as React from "react";
import { useEffect } from "react";

import withNavbar from "../Shared/Component/NavBar";
import {
  startChatConnection,
  closeChatConnection,
} from "../Shared/Utils/Websocket";

import { StyledChatScreen, StyledWatchList, ChatPage } from "./styles";

function openChatWindow(userId: string) {
  console.log(`${userId} clicked`);
}

function Chat() {
  useEffect(() => {
    startChatConnection();
    return closeChatConnection;
  }, []);
  return (
    <ChatPage>
      <StyledChatScreen></StyledChatScreen>
      <StyledWatchList openChatWindow={openChatWindow}></StyledWatchList>
    </ChatPage>
  );
}

export default withNavbar(Chat);
