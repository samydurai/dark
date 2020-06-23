import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Remove from "@material-ui/icons/RemoveCircleOutline";

import { StyledListItemText } from "./styles";

export default function WatchListItem({
  userId,
  removeFn,
}: {
  userId: string;
  removeFn: () => void;
}) {
  return (
    <ListItem button>
      <StyledListItemText>{userId}</StyledListItemText>
      <ListItemIcon onClick={removeFn.bind(null, userId)}>
        <Remove />
      </ListItemIcon>
    </ListItem>
  );
}
