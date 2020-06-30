import { styled } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Close from "@material-ui/icons/Close";

export const StyledPaperHeader = styled(Paper)({
  "justify-content": "space-between",
});

export const StyledCloseIcon = styled(Close)({
  height: "0.75em",
  widht: "0.75em",
});
