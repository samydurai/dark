import * as React from "react";
import { useEffect } from "react";

import withNavbar from "../Shared/Component/NavBar";
import useChatState from "../Shared/Hooks/useChatState";
import {
  startChatConnection,
  closeChatConnection,
  listenToMessage,
} from "../Shared/Utils/Websocket";

import { StyledChatScreen, StyledWatchList, ChatPage } from "./styles";

function Chat() {
  const {
    state,
    openChatWindow,
    closeChatWindow,
    sendMessage,
    recieveMessage,
    changeActiveTab,
    changeConnectionState,
  } = useChatState();
  useEffect(() => {
    startChatConnection(changeConnectionState);
    return closeChatConnection.bind(this, changeConnectionState);
  }, [changeConnectionState]);
  useEffect(() => {
    if (state.isConnected) {
      listenToMessage(recieveMessage);
    }
  }, [state.isConnected, recieveMessage]);
  return (
    <ChatPage>
      <StyledChatScreen
        state={state}
        openChatWindow={openChatWindow}
        closeChatWindow={closeChatWindow}
        sendMessage={sendMessage}
        changeActiveTab={changeActiveTab}
      ></StyledChatScreen>
      <StyledWatchList
        openChatWindow={openChatWindow}
        connectionState={state.isConnected}
      ></StyledWatchList>
    </ChatPage>
  );
}

export default withNavbar(Chat);
