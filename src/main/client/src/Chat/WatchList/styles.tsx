import styled from "styled-components";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";

export const StyledList = styled(List)`
  flex: 1 0 auto;
`;

export const StyledWatchList = styled.div`
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

export const Search = styled(TextField)`
  flex: 0 0 auto;
`;

export const StyledWatchListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
