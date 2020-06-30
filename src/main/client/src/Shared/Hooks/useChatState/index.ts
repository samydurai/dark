import { useReducer, useCallback } from "react";

import { sendMessage as sendWebsocketMessage } from "../../Utils/Websocket";

export interface Message {
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

export interface PageState {
  tabs: string[];
  messages: {
    [key: string]: Message[] | void;
  };
}

enum Actions {
  OPEN,
  CLOSE,
  MESSAGE_RECIEVED,
}
interface PageAction {
  action: Actions;
  tab?: string;
  message?: Message;
}

const inintalState: PageState = {
  tabs: [],
  messages: {},
};

function reducer(state: PageState, action: PageAction): PageState {
  switch (action.action) {
    case Actions.OPEN:
      state.tabs.push(action.tab);
      return { ...state, tabs: state.tabs };
    case Actions.CLOSE:
      const filteredTabs = state.tabs.filter((id) => action.tab !== id);
      return { ...state, tabs: filteredTabs };
    case Actions.MESSAGE_RECIEVED:
      const currentUserMessages = state.messages[action.message.to] || [];
      currentUserMessages.push(action.message);
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.message.to]: currentUserMessages,
        },
      };
    default:
      return state;
  }
}

export default function useChatState() {
  const [state, dispatch] = useReducer(reducer, inintalState);

  const openChatWindow = useCallback(
    (userId: string): void => {
      dispatch({
        action: Actions.OPEN,
        tab: userId,
      });
    },
    [dispatch]
  );

  const closeChatWindow = useCallback(
    (userId: string) => {
      dispatch({
        action: Actions.CLOSE,
        tab: userId,
      });
    },
    [dispatch]
  );

  const sendMessage = useCallback(
    (message: Message) => {
      dispatch({
        action: Actions.MESSAGE_RECIEVED,
        message: message,
      });
      sendWebsocketMessage(message);
    },
    [dispatch]
  );

  const recieveMessage = useCallback(
    (message: Message) => {
      const fromUser = message.from;
      if (!state.tabs.find((user) => user === fromUser)) {
        dispatch({
          action: Actions.OPEN,
          tab: fromUser,
        });
      }
      dispatch({
        action: Actions.MESSAGE_RECIEVED,
        message: message,
      });
    },
    [dispatch, state.tabs]
  );

  return {
    state,
    openChatWindow,
    closeChatWindow,
    sendMessage,
    recieveMessage,
  };
}
