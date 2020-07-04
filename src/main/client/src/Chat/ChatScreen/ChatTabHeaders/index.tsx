import * as React from "react";
import { forwardRef, useMemo } from "react";

import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";

import { StyledPaperHeader, StyledCloseIcon } from "./styles";
import { Tab as TabProp } from "../../../Shared/Hooks/useChatState";

export default function TabHeader(tabProps: ChatTabHeaderProps) {
  const ModifiedTab = useMemo(() => {
    return forwardRef(function Header(props, ref) {
      return (
        <StyledPaperHeader ref={ref} {...props} component={undefined}>
          {tabProps.tab.userId}
          <IconButton onClick={tabProps.closeTab.bind(this, tabProps.tab)}>
            <StyledCloseIcon />
          </IconButton>
        </StyledPaperHeader>
      );
    });
  }, [tabProps.tab, tabProps.closeTab]);
  return (
    <Tab component={ModifiedTab} {...tabProps} value={tabProps.tab.userId} />
  );
}

interface ChatTabHeaderProps {
  tab: TabProp;
  closeTab: (u: TabProp, e: React.SyntheticEvent) => void;
  value: string;
}
