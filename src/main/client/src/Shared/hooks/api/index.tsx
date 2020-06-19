import axios, { Method } from "axios";
import { useState, useEffect } from "react";

export interface Payload {
  data?: any;
  url: string;
  method: Method;
}
export default function useApi(payload?: Payload) {
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    err: null,
  });
  const { data, url, method } = payload || {};
  useEffect(() => {
    if (url && method) {
      setState({ data: null, isLoading: true, err: null });
      axios({
        url,
        method,
        data,
      })
        .then((data) => setState({ data, isLoading: false, err: null }))
        .catch((err) => setState({ data: null, isLoading: false, err }));
    }
  }, [url, method, data]);
  return [state.data, state.err, state.isLoading];
}
