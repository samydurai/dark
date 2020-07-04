import axios from "axios";

export const loadWatchList = () =>
  axios.get<string[]>("/watchlist").then((resp) => resp.data);

export const addToWatchList = (userId: string) =>
  axios.post("/watchlist/add", { userId });

export const removeFromWatchList = (userId: string) =>
  axios.post("/watchlist/remove", { userId });
