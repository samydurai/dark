import * as React from "react";

import { Message } from "../../../Shared/Hooks/useChatState";

import UserMessage from "./Message";
import MessageInput from "./MessageInput";
import { StyledChatTab, MessageContainer } from "./styles";

export default function ChatTab(props: ChatTabProps) {
  const { value, userId, messages, sendMessage } = props;

  if (value !== userId) {
    return null;
  }

  return (
    <StyledChatTab role="tabpanel" hidden={value !== userId}>
      <MessageContainer>
        {messages.map((message, index) => (
          <UserMessage key={index} message={message} />
        ))}
      </MessageContainer>
      <MessageInput sendMessage={sendMessage} userId={userId}></MessageInput>
    </StyledChatTab>
  );
}

interface ChatTabProps {
  value: string;
  userId: string;
  messages: Message[];
  sendMessage: (m: Message) => void;
}
