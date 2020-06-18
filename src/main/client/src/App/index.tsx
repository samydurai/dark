import * as React from "react";
import { lazy, Suspense, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyles from "../Shared/styles";
import ProtectedRoutes from "../Shared/Component/ProtectedRoute";
import Chat from "../Chat";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme } from "./theme";
import { setAuthHeader } from "../Shared/utils/Auth";

const Login = lazy(() => import("../Login"));
const Register = lazy(() => import("../Signup"));

export default function App() {
  useMemo(setAuthHeader, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles></GlobalStyles>
      <Router>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register} />
            <ProtectedRoutes component={Chat}></ProtectedRoutes>
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}
