import * as React from "react";
import { useState, useCallback } from "react";

import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/AddBox";

import Item from "./WatchListItem";
import {
  StyledList,
  StyledWatchList,
  Search,
  StyledWatchListHeader,
} from "./styles";

export default function WatchList({
  className,
  openChatWindow,
}: {
  className?: string;
  openChatWindow: (userId: string) => void;
}) {
  const [users, setUsers] = useState([
    "raiden",
    "raigor",
    "stonehoof",
    "elzaroth",
  ]);

  const removeUserFromWatchList = useCallback(
    (userId, e: React.SyntheticEvent): void => {
      e.stopPropagation();
      setUsers((users) => users.filter((user) => user !== userId));
      console.log(userId);
    },
    []
  );

  const renderList = useCallback((users: string[]) => {
    return users.map((user) => (
      <Item
        key={user}
        userId={user}
        removeFn={removeUserFromWatchList}
        openChatWindow={openChatWindow}
      />
    ));
  }, []);

  return (
    <StyledWatchList className={className}>
      <StyledWatchListHeader>
        <h3> Watch List</h3>
        <IconButton>
          <Add></Add>
        </IconButton>
      </StyledWatchListHeader>
      <StyledList>{renderList(users)}</StyledList>
      <Search placeholder="Search" fullWidth variant="outlined" />
    </StyledWatchList>
  );
}
