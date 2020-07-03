import { styled } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Close from "@material-ui/icons/Close";

export const StyledPaperHeader = styled(Paper)({
  "justify-content": "space-between",
  "text-transform": "none",
});

export const StyledCloseIcon = styled(Close)({
  height: "0.5em",
  width: "0.5em",
});
