import axios from "axios";

const instance = axios.create({
  baseURL: "/api/flow/watch",
});

export const loadWatchList = () =>
  instance.get<string[]>("/").then((resp) => resp.data);

export const addToWatchList = (userId: string) =>
  instance.post("/", {
    watch: [userId],
  });

export const removeFromWatchList = (userId: string) =>
  instance.post("/", { unwatch: [userId] });
