import * as React from "react";
import { useEffect } from "react";

import withNavbar from "../Shared/Component/NavBar";
import {
  startChatConnection,
  closeChatConnection,
} from "../Shared/Utils/Websocket";

import { StyledChatScreen, StyledWatchList, ChatPage } from "./styles";

const users = ["raiden", "raigor", "stonehoof", "elzaroth"];

function Chat() {
  useEffect(() => {
    startChatConnection();
    return closeChatConnection;
  }, []);
  return (
    <ChatPage>
      <StyledChatScreen></StyledChatScreen>
      <StyledWatchList watchListUsers={users}></StyledWatchList>
    </ChatPage>
  );
}

export default withNavbar(Chat);
