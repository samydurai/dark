import * as React from "react";
import { forwardRef, useMemo } from "react";

import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";

import { StyledPaperHeader, StyledCloseIcon } from "./styles";

export default function TabHeader(tabProps: ChatTabHeaderProps) {
  const ModifiedTab = useMemo(() => {
    return forwardRef(function Header(props, ref) {
      return (
        <StyledPaperHeader ref={ref} {...props}>
          {tabProps.userId}
          <IconButton onClick={tabProps.closeTab.bind(this, tabProps.userId)}>
            <StyledCloseIcon />
          </IconButton>
        </StyledPaperHeader>
      );
    });
  }, [tabProps.userId, tabProps.closeTab]);
  return <Tab component={ModifiedTab} {...tabProps} value={tabProps.userId} />;
}

interface ChatTabHeaderProps {
  userId: string;
  closeTab: (u: string) => void;
  [key: string]: any;
}
