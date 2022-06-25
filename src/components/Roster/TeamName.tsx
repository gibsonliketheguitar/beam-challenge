import React, { useRef, useState } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useTheme } from "@emotion/react";

import EditIcon from "../../assets/EditIcon";
import { teamNameAtom } from "../../store/atom";

export default function TeamName() {
  const theme: any = useTheme();
  const teamNameRef: any = useRef();
  const [teamName, setName] = useAtom(teamNameAtom);
  const [canEdit, setCanEdit] = useState(true);

  const onEdit = () => {
    setCanEdit(false);
    setTimeout(() => {
      teamNameRef.current.focus();
    }, 0);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === "Escape") setCanEdit(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" color={theme.palette.primary.main}>
        Roster Details
      </Typography>
      <TextField
        disabled={canEdit}
        inputRef={teamNameRef}
        size="small"
        placeholder="My Team"
        variant="outlined"
        value={teamName}
        onBlur={() => setCanEdit(true)}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          minWidth: theme.spacing(24),
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={onEdit}
              sx={{ visibility: canEdit ? "visible" : "hidden" }}
            >
              <EditIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
