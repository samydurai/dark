import * as React from "react";
import { lazy, Suspense, useMemo, useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Chat from "../Chat";
import { darkTheme } from "./theme";
import GlobalStyles from "../Shared/styles";
import ProtectedRoutes from "../Shared/Component/ProtectedRoute";
import { MessageProvider } from "../Shared/Context/Message";
import { setAuthHeader } from "../Shared/utils/Auth";

const Login = lazy(() => import("../Login"));
const Register = lazy(() => import("../Signup"));

export default function App() {
  const handleClose = useCallback(() => {
    setSnackbarState((state) => ({ ...state, open: false }));
  }, []);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    onClose: handleClose,
    autoHideDuration: 4000,
  });
  useMemo(setAuthHeader, []);
  return (
    <MessageProvider value={setSnackbarState}>
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
        <Snackbar {...snackbarState} />
      </ThemeProvider>
    </MessageProvider>
  );
}
