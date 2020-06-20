import { Method } from "axios";
import * as React from "react";
import { useState, ChangeEvent, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import useApi from "../Shared/hooks/useApi";
import { TextInput } from "../Shared/StyledMaterialui";
import { StyledPaper, Page, ErrorDiv } from "../Shared/StyledComponents";
import Password from "../Shared/Component/Password";
import { setAuthHeader, authHeaders } from "../Shared/utils/Auth";
import useMessage from "../Shared/hooks/useMessagebar";

const url = "/api/register";
const method: Method = "post";
const passwordRegex = new RegExp(
  "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$"
);
const checkId = (userId: string) => !!userId;
const checkPassword = (password: string) => passwordRegex.test(password);
const checkRePassword = (password: string, repassword: string) =>
  password === repassword;

export default function Signup() {
  const setMessage = useMessage();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRePasswordValid, setIsRePasswordValid] = useState(true);
  const [payload, setPayload] = useState(null);
  const [data, err] = useApi(payload);
  const register = () => {
    const validId = checkId(userId);
    const validPassword = checkPassword(password);
    const validRepassword = checkRePassword(password, repassword);
    setIsIdValid(validId);
    setIsPasswordValid(validPassword);
    setIsRePasswordValid(validRepassword);
    if (validId && validPassword && validRepassword) {
      setPayload({
        url,
        method,
        data: { username: userId, password: password },
      });
    }
  };
  useEffect(() => {
    if (!!data) {
      setAuthHeader();
      setMessage("Registered");
    }
  }, [data, setMessage]);
  const userIdChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const passwordChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const repasswordChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setRepassword(e.target.value);
  if (authHeaders.jwt) {
    return <Redirect to="/chat" />;
  }
  return (
    <Page>
      <StyledPaper>
        <TextInput
          variant="outlined"
          label="User ID"
          value={userId}
          onChange={userIdChanged}
          color="secondary"
          helperText={isIdValid ? "" : "Required"}
          error={!isIdValid}
        ></TextInput>
        <Password
          variant="outlined"
          label="Password"
          value={password}
          onChange={passwordChanged}
          helperText={
            isPasswordValid
              ? ""
              : "Password should be atleast 8 char in length and have 1 Uppercase 1 Lowercase 1 number and 1 special character"
          }
          error={!isPasswordValid}
          color="secondary"
        ></Password>
        <Password
          variant="outlined"
          label="Confirm Password"
          value={repassword}
          onChange={repasswordChanged}
          color="secondary"
          error={!isRePasswordValid}
          helperText={
            isRePasswordValid
              ? ""
              : "Those Passwords don't match. Please try again"
          }
        ></Password>
        <Button onClick={register} variant="contained" color="primary">
          <b>Register</b>
        </Button>
      </StyledPaper>
      <br />
      {err && <ErrorDiv>{err}</ErrorDiv>}
    </Page>
  );
}
