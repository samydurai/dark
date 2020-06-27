import { Client } from "@stomp/stompjs";
import { authHeaders } from "../Auth";

declare const SockJS: any;

let client: Client = null;

export function startChatConnection() {
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
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.onConnect = function (frame) {
    console.log(frame);
  };

  client.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };
  client.activate();
  client.subscribe("/user/queue/reply", (message) => console.log(message));
}

export function closeChatConnection() {
  client.deactivate();
}

export { client };
