import axios from "axios";

export const loadIgnoreList = () =>
  axios.get<string[]>("/ignoreList").then((resp) => resp.data);

export const addToIgnoreList = (userId: string) =>
  axios.post("/ignoreList/add", { userId });

export const removeFromIgnoreList = (userId: string) =>
  axios.post("/ignore/remove", { userId });
