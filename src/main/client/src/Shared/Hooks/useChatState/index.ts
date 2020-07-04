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
  activeTab: string;
  tabs: Tab[];
  messages: {
    [key: string]: Message[] | void;
  };
  isConnected: boolean;
}

enum Actions {
  OPEN,
  CLOSE,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  CLEAR_NEW,
  CHANGE_TAB,
  CHANGE_CONNECTION_STATE,
}
interface PageAction {
  action: Actions;
  tab?: Tab;
  message?: Message;
  activeTab?: string;
  connectionState?: boolean;
}

const inintalState: PageState = {
  activeTab: null,
  tabs: [],
  messages: {},
  isConnected: false,
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
      return {
        ...state,
        tabs: filteredTabs,
        activeTab: filteredTabs[filteredTabs.length - 1]?.userId,
      };
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
    case Actions.CHANGE_TAB:
      return { ...state, activeTab: action.activeTab };
    case Actions.CHANGE_CONNECTION_STATE:
      return { ...state, isConnected: action.connectionState };
    default:
      return state;
  }
}

export default function useChatState() {
  const [state, dispatch] = useReducer(reducer, inintalState);

  const openChatWindow = useCallback(
    (tab: Tab, changeTab?: boolean): void => {
      if (
        state.tabs.findIndex((stateTab) => stateTab.userId === tab.userId) >= 0
      ) {
        dispatch({
          action: Actions.CHANGE_TAB,
          activeTab: tab.userId,
        });
      } else {
        dispatch({
          action: Actions.OPEN,
          tab,
        });
        if (typeof changeTab === "boolean" && changeTab) {
          dispatch({
            action: Actions.CHANGE_TAB,
            activeTab: tab.userId,
          });
        }
      }
    },
    [dispatch, state.tabs]
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
      if (!state.activeTab) {
        dispatch({
          action: Actions.CHANGE_TAB,
          activeTab: fromUser,
        });
      }
    },
    [dispatch, state.tabs, state.activeTab]
  );

  const changeActiveTab = useCallback(
    (t: string) => {
      dispatch({
        action: Actions.CHANGE_TAB,
        activeTab: t,
      });
    },
    [dispatch]
  );

  const changeConnectionState = useCallback(
    (s: boolean) => {
      dispatch({
        action: Actions.CHANGE_CONNECTION_STATE,
        connectionState: s,
      });
    },
    [dispatch]
  );

  return {
    state,
    openChatWindow,
    closeChatWindow,
    sendMessage,
    recieveMessage,
    changeActiveTab,
    changeConnectionState,
  };
}
