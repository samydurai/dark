import * as React from "react";
import { useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button, { ButtonProps } from "@material-ui/core/Button";

import ChatTab from "./ChatTab";

const TabHeader = React.forwardRef(function TabName(props: ButtonProps, ref) {
  return (
    <Button ref={ref as any} {...props}>
      Raiden
    </Button>
  );
});

export default function ChatWindow({ className }: { className?: string }) {
  const [currentTab, changeCurrentTab] = useState(0);
  const handleTabChange = (event: React.ChangeEvent, tabNumber: number) => {
    changeCurrentTab(tabNumber);
  };
  return (
    <div className={className}>
      <Paper>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab component={TabHeader} />
          <Tab component={TabHeader} />
        </Tabs>
      </Paper>
      <ChatTab value={currentTab} index={0} userId="raiden"></ChatTab>
      <ChatTab value={currentTab} index={1} userId="scorpion"></ChatTab>
    </div>
  );
}
