import * as React from "react";
import { useState, useCallback, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/AddBox";

import { Tab } from "../../Shared/Hooks/useChatState";
import { watchList } from "../../Shared/APIs";

import Item from "./WatchListItem";
import AddUser from "./AddUser";
import {
  StyledList,
  StyledWatchList,
  StyledWatchListHeader,
  StyledListContainer,
} from "./styles";

export default function WatchList({
  className,
  openChatWindow,
}: {
  className?: string;
  openChatWindow: (tab: Tab) => void;
}) {
  const [users, setUsers] = useState(
    "asddfbfhghdfysdhfuygudfuduisfhdfdf".split("")
  );

  useEffect(() => {
    async function load() {
      const data = await watchList.load();
      setUsers(data);
    }
    load();
  }, []);

  const addUser = useCallback((userId: string) => {
    watchList.add(userId);
  }, []);

  const removeUser = useCallback((userId: string) => {
    watchList.delete(userId);
  }, []);

  const [dialogState, changeDialogState] = useState<boolean>(false);

  const handleClose = useCallback(
    (userId: string) => {
      changeDialogState(false);
      if (
        typeof userId === "string" &&
        userId &&
        users.findIndex((id) => id === userId) === -1
      ) {
        setUsers((users) => [...users, userId]);
        addUser(userId);
      }
    },
    [changeDialogState, users, addUser]
  );

  const removeUserFromWatchList = useCallback(
    (userId, e: React.SyntheticEvent): void => {
      e.stopPropagation();
      setUsers((users) => users.filter((user) => user !== userId));
      removeUser(userId);
    },
    [removeUser]
  );

  const renderList = useCallback(
    (users: string[]) => {
      return users.map((user) => (
        <Item
          key={user}
          userId={user}
          removeFn={removeUserFromWatchList}
          openChatWindow={openChatWindow}
        />
      ));
    },
    [openChatWindow, removeUserFromWatchList]
  );

  return (
    <StyledWatchList className={className}>
      <StyledWatchListHeader>
        <h3> Watch List</h3>
        <IconButton onClick={changeDialogState.bind(this, true)}>
          <Add></Add>
        </IconButton>
      </StyledWatchListHeader>
      <StyledListContainer>
        <StyledList>{renderList(users)}</StyledList>
      </StyledListContainer>
      <AddUser open={dialogState} handleClose={handleClose}></AddUser>
    </StyledWatchList>
  );
}
