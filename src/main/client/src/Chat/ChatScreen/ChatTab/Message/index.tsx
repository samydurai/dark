import * as React from "react";

import { Message } from "../../../../Shared/Hooks/useChatState";

import { StyledSelfMessage, StyledMessage } from "./styles";

export default function Message({ message }: MessageProps) {
  if (message.from) {
    return <StyledMessage>Self Message</StyledMessage>;
  }
  return <StyledSelfMessage>{message.message}</StyledSelfMessage>;
}

interface MessageProps {
  message: Message;
}
