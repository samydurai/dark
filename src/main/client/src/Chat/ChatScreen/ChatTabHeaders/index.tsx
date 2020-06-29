import * as React from "react";
import { forwardRef, useMemo } from "react";

import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";

export default function TabHeader(tabProps: ChatTabHeaderProps) {
  const ModifiedTab = useMemo(() => {
    return forwardRef(function Header(props, ref) {
      return (
        <Paper ref={ref} {...props}>
          {tabProps.userId}
        </Paper>
      );
    });
  }, [tabProps.userId]);
  return <Tab component={ModifiedTab} {...tabProps} value={tabProps.userId} />;
}

interface ChatTabHeaderProps {
  userId: string;
  closeTab: (u: string) => void;
  [key: string]: any;
}
