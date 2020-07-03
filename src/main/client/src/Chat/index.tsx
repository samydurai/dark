import * as React from "react";
import { useEffect } from "react";

import withNavbar from "../Shared/Component/NavBar";
import useChatState from "../Shared/Hooks/useChatState";
import {
  startChatConnection,
  closeChatConnection,
} from "../Shared/Utils/Websocket";

import { StyledChatScreen, StyledWatchList, ChatPage } from "./styles";

function Chat() {
  const {
    state,
    openChatWindow,
    closeChatWindow,
    sendMessage,
    recieveMessage,
  } = useChatState();
  useEffect(() => {
    startChatConnection(recieveMessage);
    return closeChatConnection;
  }, [recieveMessage]);
  return (
    <ChatPage>
      <StyledChatScreen
        state={state}
        openChatWindow={openChatWindow}
        closeChatWindow={closeChatWindow}
        sendMessage={sendMessage}
      ></StyledChatScreen>
      <StyledWatchList openChatWindow={openChatWindow}></StyledWatchList>
    </ChatPage>
  );
}

export default withNavbar(Chat);
