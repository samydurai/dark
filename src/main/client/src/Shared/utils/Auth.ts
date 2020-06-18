import axios from "axios";

export interface AuthHeaders {
  jwt: string | null;
}

function getCookie(cname: any) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setAuthHeader() {
  const jwt = getCookie("COOKIE_BEARER");
  axios.defaults.headers["Authorization"] = `Bearer ${jwt}`;
  authHeaders.jwt = jwt;
}

export const authHeaders: AuthHeaders = {
  jwt: null,
};
