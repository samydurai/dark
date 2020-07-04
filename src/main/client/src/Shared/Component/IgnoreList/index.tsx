import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import List from "@material-ui/core/List";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Add from "@material-ui/icons/Add";

import IgnoreListItem from "./IgnoreListItem";
import { StyledFormControl } from "./styles";

import { ignoreList } from "../../APIs";

export default function IgnoreList({ open, handleClose }: IgnoreListProps) {
  const [list, changeList] = useState("abcdefghijklmnopqrstuvwxyz".split(""));
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    async function load() {
      const data = await ignoreList.load();
      changeList(data);
    }
    load();
  }, []);

  const addToIgnoreList = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const input = inputRef.current.value;
      changeList((list) => {
        if (list.findIndex((user) => user === input) === -1 && input) {
          return [...list, input];
        }
        return list;
      });
      inputRef.current.value = "";
      ignoreList.add(input);
    },
    [changeList]
  );

  const removeFromIgnoreList = useCallback(
    async (userId) => {
      changeList((list) => list.filter((id) => id !== userId));
      ignoreList.delete(userId);
    },
    [changeList]
  );

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <Paper>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        Ignore List
      </Paper>
      <div>
        <form onSubmit={addToIgnoreList}>
          <StyledFormControl variant="outlined">
            <Input
              id="message-input"
              rows={1}
              placeholder="Type Here..."
              inputRef={inputRef}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={addToIgnoreList}>
                    <Add></Add>
                  </IconButton>
                </InputAdornment>
              }
            />
          </StyledFormControl>
        </form>
      </div>
      <List>
        {list.map((userId, index) => (
          <IgnoreListItem
            userId={userId}
            key={index}
            removeFn={removeFromIgnoreList.bind(this, userId)}
          />
        ))}
      </List>
    </Dialog>
  );
}

interface IgnoreListProps {
  open: boolean;
  handleClose: () => void;
}
