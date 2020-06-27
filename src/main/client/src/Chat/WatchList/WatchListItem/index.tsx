import * as React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Remove from "@material-ui/icons/Cancel";

import { StyledListItemText, StyledListItem } from "./styles";

export default function WatchListItem({
  userId,
  removeFn,
  openChatWindow,
}: {
  userId: string;
  removeFn: (userId: string, e: React.SyntheticEvent) => void;
  openChatWindow: (userId: string) => void;
}) {
  return (
    <StyledListItem button onClick={openChatWindow.bind(null, userId)}>
      <StyledListItemText>{userId}</StyledListItemText>
      <ListItemIcon onClick={removeFn.bind(null, userId)}>
        <Remove />
      </ListItemIcon>
    </StyledListItem>
  );
}
