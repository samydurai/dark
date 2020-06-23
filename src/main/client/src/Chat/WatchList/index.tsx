import * as React from "react";
import { noop } from "lodash";

import Item from "./WatchListItem";
import { StyledList, StyledWatchList, Search } from "./styles";

function renderList(watchListUsers: string[]) {
  return watchListUsers.map((user) => (
    <Item key={user} userId={user} removeFn={noop} />
  ));
}

export default function WatchList({
  className,
  watchListUsers,
}: {
  className?: string;
  watchListUsers: string[];
}) {
  return (
    <StyledWatchList className={className}>
      <h3> Watch List</h3>
      <StyledList>{renderList(watchListUsers)}</StyledList>
      <Search placeholder="Search" fullWidth variant="outlined" />
    </StyledWatchList>
  );
}
