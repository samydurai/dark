import { Client } from "@stomp/stompjs";
import { authHeaders } from "../Auth";

let client: Client = null;

export function startChatConnection() {
  client = new Client({
    brokerURL: `ws://${window.location.host}/chat`,
    connectHeaders: {
      "CSRF-TOKEN": authHeaders.XSRF,
    },
    debug: function (str) {
      console.log(str);
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
}

export function closeChatConnection() {
  client.deactivate();
}
