import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { GridCloseIcon, GridSearchIcon } from "@mui/x-data-grid";
import SearchIcon from "../../assets/SearchIcon";

export default function Search() {
  const theme: any = useTheme();
  //TODO: looking into if searchInput is re-rendering each time
  const searchRef = useRef("hello");
  const [input, setInput] = useState("");
  const [canSearch, setCanSearch] = useState(true);
  const [hasRoster, setRoster] = useState(false);

  const ImportBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
  }));

  //TODO animate Search CAT so user know if it's being pressed or not
  const SearchCAT = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  const onImport = () => {
    setRoster((prev) => !prev);
  };

  //TODO add animation to transition text clearing, to give an extra polish
  const onReset = () => {
    if (canSearch) return;
    setInput("");
    setCanSearch(true);
  };

  const onSubmit = () => {
    if (!hasRoster) return;
    setCanSearch(false);
  };

  return (
    <Box id="test">
      <TextField
        disabled={false}
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
      <ImportBtn
        onClick={onImport}
        size="medium"
        variant={hasRoster ? "outlined" : "contained"}
      >
        {hasRoster ? "Re-Import Team" : "Import Team"}
      </ImportBtn>
    </Box>
  );
}
