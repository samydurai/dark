import * as React from "react";
import { lazy, Suspense, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Chat from "../Chat";
import { darkTheme } from "./theme";
import GlobalStyles from "../Shared/styles";
import { useInitSnackbar } from "../Shared/Hooks/useSnackbar";
import ProtectedRoutes from "../Shared/Component/ProtectedRoute";
import { MessageProvider } from "../Shared/Context/Message";
import { setAuthHeader } from "../Shared/Utils/Auth";

const Login = lazy(() => import("../Login"));
const Register = lazy(() => import("../Register"));

export default function App() {
  const [snackbarState, setSnackbarState] = useInitSnackbar();
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
