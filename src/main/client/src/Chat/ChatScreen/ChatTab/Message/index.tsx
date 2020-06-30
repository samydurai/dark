import * as React from "react";

import { Message } from "../../../../Shared/Hooks/useChatState";

export default function Message({ message }: MessageProps) {
  return (
    <div>
      {message.from}: {message.message}
    </div>
  );
}

interface MessageProps {
  message: Message;
}
