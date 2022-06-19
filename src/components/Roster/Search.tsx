import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "../../assets/CloseIcon";
import SearchIcon from "../../assets/SearchIcon";
import { useAtom } from "jotai";
import { rosterAtom } from "../../store/atom";
import { default as ImportTeamButton } from "./Import";

export default function Search() {
  const [canSearch, setCanSearch] = useState(true);
  //TODO: looking into if searchInput is re-rendering each time
  const [input, setInput] = useState("");
  const [roster, _] = useAtom(rosterAtom);
  const theme: any = useTheme();

  //TODO animate Search CAT so user know if it's being pressed or not
  const SearchCAT = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  //TODO add animation to transition text clearing, to give an extra polish
  const onReset = () => {
    if (canSearch) return;
    setInput("");
    setCanSearch(true);
  };

  const onSubmit = () => {
    if (!roster) return;
    setCanSearch(false);
  };

  return (
    <Box id="test">
      <TextField
        disabled={!roster}
        id="findPlayer"
        placeholder="Find Player"
        size="small"
        sx={{ marginRight: theme.spacing(2) }}
        onChange={(e) => setInput(e.target.value)}
        value={input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: canSearch ? (
            <SearchCAT onClick={onSubmit}>Search</SearchCAT>
          ) : (
            <InputAdornment position="end" onClick={onReset}>
              <CloseIcon />
            </InputAdornment>
          ),
        }}
      />
      <ImportTeamButton />
    </Box>
  );
}
