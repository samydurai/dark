import { useState, useCallback, useEffect } from "react";

import { watchList } from "../../../Shared/APIs";
import { listenToStatusChange } from "../../Utils/Websocket";

const addUser = (userId: string) => {
  watchList.add(userId);
};

const removeUser = (userId: string) => {
  watchList.delete(userId);
};

export default function useWatchListState(isConnected: boolean) {
  const [list, setList] = useState<WatchList[]>([]);

  const updateUserStatus = useCallback((update: WatchList) => {
    setList((list) => {
      return list.map((u) => {
        if (u.username !== update.username) {
          return u;
        }
        return update;
      });
    });
  }, []);

  useEffect(() => {
    async function load() {
      const data = await watchList.load();
      setList(data);
    }
    load();
  }, []);

  useEffect(() => {
    if (isConnected) {
      listenToStatusChange(updateUserStatus);
    }
  }, [updateUserStatus, isConnected]);

  const removeUserFromWatchList = useCallback(
    (userId: string, e: React.SyntheticEvent): void => {
      e.stopPropagation();
      setList((users) => users.filter((user) => user.username !== userId));
      removeUser(userId);
    },
    []
  );

  const addUserToWatchList = useCallback((userId: string) => {
    if (typeof userId === "string" && userId) {
      setList((users) => {
        if (users.findIndex((u) => u.username === userId) !== -1) {
          return users;
        }
        return [...users, { username: userId, userStatus: Status.OFFLINE }];
      });
      addUser(userId);
    }
  }, []);

  return {
    list,
    updateUserStatus,
    removeUserFromWatchList,
    addUserToWatchList,
  };
}

export interface WatchList {
  username: string;
  userStatus: Status;
}

export enum Status {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
