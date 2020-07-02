import * as React from "react";
import { useState, useCallback, lazy } from "react";

import Add from "@material-ui/icons/PersonAdd";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";

import { useShowSnackbar } from "../../Shared/Hooks/useSnackbar";
import { PageState, Message, Tab } from "../../Shared/Hooks/useChatState";

import ChatTab from "./ChatTab";
import ChatTabHeader from "./ChatTabHeaders";
import EmptyState from "./EmptyState";
import { StyledPaper } from "./styles";

const AddPerson = lazy(() => import("./AddPerson"));

interface ChatWindowProps {
  className?: string;
  state: PageState;
  openChatWindow: (u: Tab) => void;
  closeChatWindow: (u: Tab) => void;
  sendMessage: (m: Message) => void;
}

export default function ChatWindow({
  className,
  state,
  openChatWindow,
  closeChatWindow,
  sendMessage,
}: ChatWindowProps) {
  const showSnackBar = useShowSnackbar();
  const [open, setOpen] = useState(false);
  const [currentTab, changeCurrentTab] = useState<string>();

  const handleTabChange = (event: React.ChangeEvent, userId: string) => {
    changeCurrentTab(userId);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = useCallback(
    (userId: string) => {
      console.info(`${userId} added to chate`);
      if (typeof userId === "string" && userId) {
        openChatWindow({
          userId,
          hasNewMessage: false,
        });
        changeCurrentTab(userId);
      } else {
        showSnackBar("user doesnt eixist");
      }
      setOpen(false);
    },
    [showSnackBar, openChatWindow]
  );

  return (
    <div className={className}>
      <StyledPaper>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
        >
          {state.tabs.map((tab, index) => (
            <ChatTabHeader
              key={index}
              tab={tab}
              closeTab={closeChatWindow}
              value={tab.userId}
            />
          ))}
        </Tabs>
        <IconButton onClick={openDialog}>
          <Add></Add>
        </IconButton>
      </StyledPaper>
      {state.tabs.length === 0 ? (
        <EmptyState openDialog={openDialog} />
      ) : (
        state.tabs.map((tab, index) => {
          const messages = state.messages[tab.userId] || [];
          return (
            <ChatTab
              value={currentTab}
              key={index}
              userId={tab.userId}
              messages={messages}
              sendMessage={sendMessage}
            ></ChatTab>
          );
        })
      )}
      {open && <AddPerson open={open} handleClose={handleClose}></AddPerson>}
    </div>
  );
}
