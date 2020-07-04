import { Client } from "@stomp/stompjs";

import { authHeaders } from "../Auth";
import { Message } from "../../Hooks/useChatState";

declare const SockJS: any;

let client: Client = null;

export function startChatConnection(
  changeConnectionState: (s: boolean) => void
) {
  client = new Client({
    connectHeaders: {
      "CSRF-TOKEN": authHeaders.XSRF,
    },
    debug: function (str) {
      console.log(str);
    },
    webSocketFactory: () => {
      return new SockJS(`http://${window.location.host}/chat`);
    },
    reconnectDelay: 5000000000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.onConnect = function (frame) {
    console.log(frame);
    changeConnectionState(true);
  };

  client.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };
  client.activate();
}

export function listen(cb: (message: Message) => void) {
  client.subscribe("/user/queue/reply", (message) =>
    cb(JSON.parse(message.body))
  );
}
export function closeChatConnection(
  changeConnectionState: (s: boolean) => void
) {
  client.deactivate();
  changeConnectionState(false);
}

export function sendMessage(message: Message) {
  client.publish({
    destination: "/app/chat",
    body: JSON.stringify(message),
  });
}

export { client };
