import React, { useRef, useState } from "react";
import { useAtomValue } from "jotai/utils";

import { Box, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { teamNameAtom } from "../../store/atom";

export default function TeamName() {
  const theme: any = useTheme();
  const teamNameRef: any = useRef();
  const teamName = useAtomValue(teamNameAtom);

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
        disabled={true}
        inputRef={teamNameRef}
        size="small"
        placeholder="My Team"
        variant="outlined"
        value={teamName === "" ? "My Team Name" : teamName}
        sx={{
          minWidth: theme.spacing(24),
        }}
      />
    </Box>
  );
}
