import * as React from "react";
import { useRef, useCallback } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { useStyles } from "./styles";

export default function AddPerson({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: (userId?: string) => void;
}) {
  const userIdEl: React.Ref<HTMLInputElement> = useRef();
  const { root: rootStyle } = useStyles();
  const closeDialog = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      handleClose(userIdEl.current.value);
    },
    [handleClose]
  );
  return (
    <Dialog className={rootStyle} open={open} onClose={handleClose}>
      <DialogTitle>Search</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the user tag to search</DialogContentText>
        <form onSubmit={closeDialog}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User ID"
            type="text"
            inputRef={userIdEl}
            spellCheck={false}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          <b>Cancel</b>
        </Button>
        <Button onClick={closeDialog} color="primary">
          <b>Search</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
