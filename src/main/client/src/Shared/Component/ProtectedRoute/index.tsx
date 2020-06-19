import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { authHeaders } from "../../utils/Auth";

export default function ProtectedRoutes(props: any) {
  if (authHeaders.jwt) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login"></Redirect>;
  }
}
