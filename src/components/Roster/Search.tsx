import React, { useEffect, useState } from "react";
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
import { rosterAtom, searchAtom } from "../../store/atom";
import { default as ImportTeamButton } from "./Import";

export default function Search() {
  const [input, setInput] = useState("");
  const [roster, _] = useAtom(rosterAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const theme: any = useTheme();

  //TODO animate Search CAT so user know if it's being pressed or not
  const SearchCAT = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  //TODO add animation to transition text clearing, to give an extra polish
  const onReset = () => {
    setInput("");
    setSearch("");
  };

  const onSearch = () => {
    if (!roster) return;
    setSearch(input.toLowerCase());
  };

  function handleDownKey(e: any) {
    if (e.key === "Enter" && input.length > 0) onSearch();
    if (e.key === "Escape" && input.length > 0) onReset();
  }

  return (
    <Box id="test">
      <TextField
        disabled={!roster}
        id="findPlayer"
        placeholder="Find Player"
        size="small"
        sx={{ marginRight: theme.spacing(2) }}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleDownKey}
        value={input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment:
            search.length === 0 ? (
              <SearchCAT onClick={onSearch}>Search</SearchCAT>
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
