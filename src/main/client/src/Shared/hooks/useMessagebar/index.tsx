import { useContext } from "react";
import { Message } from "../../Context/Message";

export default function useMessageBar() {
  const setMessageState = useContext(Message);
  const showMessage = (message: string) => {
    setMessageState((state: any) => ({ ...state, message, open: true }));
  };
  return showMessage;
}
