import * as React from "react";
import { useState, useEffect } from "react";
import { LESpan, StyledLink } from "./styles";
import { useLoginApi, credentials } from "../Shared/hooks/login";
import { StyledPaper, Page, ErrorDiv } from "../Shared/StyledComponents";
import { TextInput } from "../Shared/StyledMaterialui";
import Button from "@material-ui/core/Button";
import Password from "../Shared/Component/Password";

export default function Login({
  setLoginStatus,
}: {
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const init: credentials = { username: "", password: "" };
  const [creds, setCreds] = useState(init);
  const [loggedIn, errorMessage] = useLoginApi(creds);
  const idChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const passwordChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  useEffect(() => {
    setLoginStatus(loggedIn);
  }, [loggedIn, setLoginStatus]);
  const login = () => {
    setCreds({
      username: id,
      password: password,
    });
  };
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
        <br />
        {errorMessage && <ErrorDiv>{errorMessage}</ErrorDiv>}
      </StyledPaper>
      <div style={{ marginTop: "10px" }}>
        <LESpan>New User? </LESpan>
        <StyledLink to="/register">Sign Up</StyledLink>
      </div>
    </Page>
  );
}
