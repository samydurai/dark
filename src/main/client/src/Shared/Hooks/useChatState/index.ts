import { useReducer, useCallback } from "react";

import { sendMessage as sendWebsocketMessage } from "../../Utils/Websocket";

export interface Message {
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

export interface Tab {
  userId: string;
  hasNewMessage: boolean;
}

export interface PageState {
  tabs: Tab[];
  messages: {
    [key: string]: Message[] | void;
  };
}

enum Actions {
  OPEN,
  CLOSE,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  CLEAR_NEW,
}
interface PageAction {
  action: Actions;
  tab?: Tab;
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
      const filteredTabs = state.tabs.filter(
        (tab) => action.tab.userId !== tab.userId
      );
      return { ...state, tabs: filteredTabs };
    case Actions.MESSAGE_RECIEVED:
      const recievedMessage = state.messages[action.message.from] || [];
      recievedMessage.push(action.message);
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.message.from]: recievedMessage,
        },
      };
    case Actions.MESSAGE_SENT:
      const sentMessage = state.messages[action.message.to] || [];
      sentMessage.push(action.message);
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.message.to]: sentMessage,
        },
      };
    case Actions.CLEAR_NEW:
      if (action.tab.hasNewMessage === false) {
        return state;
      }
    default:
      return state;
  }
}

export default function useChatState() {
  const [state, dispatch] = useReducer(reducer, inintalState);

  const openChatWindow = useCallback(
    (tab: Tab): void => {
      dispatch({
        action: Actions.OPEN,
        tab,
      });
    },
    [dispatch]
  );

  const closeChatWindow = useCallback(
    (tab: Tab) => {
      dispatch({
        action: Actions.CLOSE,
        tab,
      });
    },
    [dispatch]
  );

  const sendMessage = useCallback(
    (message: Message) => {
      dispatch({
        action: Actions.MESSAGE_SENT,
        message: message,
      });
      sendWebsocketMessage(message);
    },
    [dispatch]
  );

  const recieveMessage = useCallback(
    (message: Message) => {
      const fromUser = message.from;
      if (!state.tabs.find((user) => user.userId === fromUser)) {
        dispatch({
          action: Actions.OPEN,
          tab: {
            userId: fromUser,
            hasNewMessage: true,
          },
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
