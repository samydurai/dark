import axios, { Method } from "axios";
import { useState, useEffect } from "react";
export default function useApi({
  url,
  method,
  data,
}: {
  url: string;
  method: Method;
  data: any;
}) {
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    err: null,
  });
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
