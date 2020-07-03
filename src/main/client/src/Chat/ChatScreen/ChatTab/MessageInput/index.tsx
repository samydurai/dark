import * as React from "react";
import { useCallback, useRef } from "react";

import Input from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";

import { Message } from "../../../../Shared/Hooks/useChatState";

export default function MessageInput({
  sendMessage,
  userId,
}: MessageInputProps) {
  const messageInputEl: React.Ref<HTMLInputElement> = useRef();

  const handleClick = useCallback(() => {
    const message: Message = {
      from: "",
      to: userId,
      timestamp: new Date().toISOString(),
      message: messageInputEl.current.value,
    };
    messageInputEl.current.value = "";
    sendMessage(message);
  }, [sendMessage, userId]);

  return (
    <FormControl variant="outlined">
      <Input
        id="message-input"
        rows={1}
        placeholder="Type Here..."
        inputRef={messageInputEl}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClick}>
              <Send></Send>
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

interface MessageInputProps {
  sendMessage: (m: Message) => void;
  userId: string;
}
