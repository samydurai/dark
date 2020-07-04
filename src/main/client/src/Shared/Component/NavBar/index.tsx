import * as React from "react";
import { useState, useRef } from "react";

import { Redirect } from "react-router";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Logout from "@material-ui/icons/ExitToAppOutlined";

import { NavPage, ComponentContainer, StyledTitle } from "./styles";
import useApi from "../../Hooks/useApi";
import IgnoreList from "../../Component/IgnoreList";

const url = "/api/logout";
const method = "post";

export default function Navbar<T>(Component: () => JSX.Element) {
  return function WithNavbar(props: React.Props<T>) {
    const [payload, setPayload] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isIgnoreListOpen, setIsIgnoreListOpen] = useState(false);
    const [isLoggedOut] = useApi(payload);
    const anchorEl = useRef<HTMLButtonElement>();

    const logout = () => {
      setPayload({ url, method });
    };

    if (isLoggedOut) {
      return <Redirect to="/login" />;
    }

    return (
      <NavPage>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <StyledTitle>Dark</StyledTitle>
            <IconButton onClick={setIsMenuOpen.bind(this, true)} ref={anchorEl}>
              <Logout />
            </IconButton>
            <Menu
              anchorEl={anchorEl.current}
              keepMounted
              open={isMenuOpen}
              onClose={setIsMenuOpen.bind(this, false)}
            >
              <MenuItem onClick={setIsIgnoreListOpen.bind(this, true)}>
                Ignore List
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
          <IgnoreList
            open={isIgnoreListOpen}
            handleClose={setIsIgnoreListOpen.bind(this, false)}
          />
        </AppBar>
        <ComponentContainer>
          <Component {...props} />
        </ComponentContainer>
      </NavPage>
    );
  };
}
