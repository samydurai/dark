import * as React from "react";

import withNavbar from "../Shared/Component/NavBar";

import { StyledChatScreen, StyledWatchList, ChatPage } from "./styles";

const users = ["raiden", "raigor", "stonehoof", "elzaroth"];

function Chat() {
  return (
    <ChatPage>
      <StyledChatScreen></StyledChatScreen>
      <StyledWatchList watchListUsers={users}></StyledWatchList>
    </ChatPage>
  );
}

export default withNavbar(Chat);
