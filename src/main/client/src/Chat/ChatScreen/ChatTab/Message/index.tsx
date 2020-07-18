import * as React from "react";

import { Message } from "../../../../Shared/Hooks/useChatState";

import {
  RightMessage,
  RightMessageContainer,
  LeftMessage,
  LeftMessageContainer,
  LeftArrow,
  RightArrow,
} from "./styles";

export default function Message({ message, isSame }: MessageProps) {
  const props = { isSame };
  if (message.from) {
    return (
      <LeftMessageContainer {...props}>
        {!isSame && <LeftArrow />}
        <LeftMessage>{message.message}</LeftMessage>
      </LeftMessageContainer>
    );
  }
  return (
    <RightMessageContainer {...props}>
      <RightMessage>{message.message}</RightMessage>
      {!isSame && <RightArrow />}
    </RightMessageContainer>
  );
}

interface MessageProps {
  message: Message;
  isSame: boolean;
}
