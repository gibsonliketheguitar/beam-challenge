import React, { useRef, useState } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import EditIcon from "../../assets/EditIcon";

export default function TeamName() {
  const theme: any = useTheme();
  const teamNameRef: any = useRef();
  const [canEdit, setCanEdit] = useState(true);
  const [name, setName] = useState("");

  const onEdit = () => {
    setCanEdit(false);
    setTimeout(() => {
      teamNameRef.current.focus();
    }, 0);
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
        value={name}
        onBlur={() => setCanEdit(true)}
        onChange={(e) => setName(e.target.value)}
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
