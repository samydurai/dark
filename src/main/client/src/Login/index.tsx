import * as React from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Method } from "axios";
import Button from "@material-ui/core/Button";
import { LESpan, StyledLink } from "./styles";
import { StyledPaper, Page, ErrorDiv } from "../Shared/StyledComponents";
import { TextInput } from "../Shared/StyledMaterialui";
import Password from "../Shared/Component/Password";
import { setAuthHeader, authHeaders } from "../Shared/utils/Auth";
import useApi from "../Shared/hooks/useApi";

const url = "/api/authenticate";
const method: Method = "post";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [payload, setPayload] = useState(null);
  const [data, err] = useApi(payload);
  const idChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const passwordChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  useEffect(() => {
    if (!!data) {
      setAuthHeader();
    }
  }, [data]);
  const login = () => {
    setPayload({
      url,
      method,
      data: {
        username: id,
        password: password,
      },
    });
  };
  if (authHeaders.jwt) {
    return <Redirect to="/chat" />;
  }
  return (
    <Page>
      <StyledPaper>
        <TextInput
          color="secondary"
          label="ID"
          variant="outlined"
          value={id}
          onChange={idChanged}
        ></TextInput>
        <Password
          label="Password"
          color="secondary"
          onChange={passwordChanged}
          value={password}
        ></Password>
        <Button variant="contained" color="primary" onClick={login}>
          <b>Login</b>
        </Button>
      </StyledPaper>
      <div style={{ marginTop: "10px" }}>
        <LESpan>New User? </LESpan>
        <StyledLink to="/register">Sign Up</StyledLink>
      </div>
      <br />
      {err && <ErrorDiv>{err}</ErrorDiv>}
    </Page>
  );
}
