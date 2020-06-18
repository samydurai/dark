import * as React from "react";
import { useState, ChangeEvent, useEffect } from "react";
import Button from "@material-ui/core/Button";
import useApi from "../Shared/hooks/api";
import { TextInput } from "../Shared/StyledMaterialui";
import { StyledPaper, Page, ErrorDiv } from "../Shared/StyledComponents";
import { Method } from "axios";
import Password from "../Shared/Component/Password";
import { Redirect } from "react-router-dom";

const url = "";
const method: Method = "get";
const checkId = (userId: string) => !!userId;
const checkPassword = (password: string) => password.length >= 8;
const checkRePassword = (password: string, repassword: string) =>
  password === repassword;

export default function Signup() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRePasswordValid, setIsRePasswordValid] = useState(true);
  const [payload, setPayload] = useState({ url, method, data: null });
  const [data, err] = useApi(payload);
  const register = () => {
    const validId = checkId(userId);
    const validPassword = checkPassword(password);
    const validRepassword = checkRePassword(password, repassword);
    setIsIdValid(validId);
    setIsPasswordValid(validPassword);
    setIsRePasswordValid(validRepassword);
    if (validId && validPassword && validRepassword) {
      setPayload((payload) => ({
        ...payload,
        data: { id: userId, password: password },
      }));
    }
  };
  const userIdChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const passwordChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const repasswordChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setRepassword(e.target.value);
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
            isPasswordValid ? "" : "Password should be atleast 8 char in length"
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
        {err && <ErrorDiv>{err}</ErrorDiv>}
      </StyledPaper>
    </Page>
  );
}
