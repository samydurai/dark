import * as React from "react";
import { useState, useCallback, lazy } from "react";

import Add from "@material-ui/icons/PersonAdd";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useShowSnackbar } from "../../Shared/Hooks/useSnackbar";

import ChatTab from "./ChatTab";
import { StyledPaper } from "./styles";

const AddPerson = lazy(() => import("./AddPerson"));

const TabHeader = React.forwardRef(function TabName(props, ref) {
  return (
    <Paper ref={ref as any} {...props}>
      Raiden
    </Paper>
  );
});

export default function ChatWindow({ className }: { className?: string }) {
  const showSnackBar = useShowSnackbar();
  const [open, setOpen] = useState(false);
  const [currentTab, changeCurrentTab] = useState(0);
  const handleTabChange = (event: React.ChangeEvent, tabNumber: number) => {
    changeCurrentTab(tabNumber);
  };
  const openDialog = () => {
    setOpen(true);
  };
  const handleClose = useCallback(
    (userId: string) => {
      if (userId) {
        console.log(userId);
        showSnackBar("User doesn't exist");
      }
      setOpen(false);
    },
    [showSnackBar]
  );
  return (
    <div className={className}>
      <StyledPaper>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab component={TabHeader} />
          <Tab component={TabHeader} />
        </Tabs>
        <IconButton onClick={openDialog}>
          <Add></Add>
        </IconButton>
      </StyledPaper>
      <ChatTab value={currentTab} index={0} userId="raiden"></ChatTab>
      <ChatTab value={currentTab} index={1} userId="scorpion"></ChatTab>
      {open && <AddPerson open={open} handleClose={handleClose}></AddPerson>}
    </div>
  );
}
