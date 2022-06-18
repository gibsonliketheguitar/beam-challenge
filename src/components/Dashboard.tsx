import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Paper, styled } from "@mui/material";
import { Container } from "@mui/system";

import Roster from "./Roster/Roster";
import Formation from "./Formation/Formation";

const Icon = styled(Paper)(({ theme }) => ({
  height: theme.spacing(4),
  width: theme.spacing(4),
  marginBottom: theme.spacing(3),
  backgroundClip: theme.palette.secondary.main,
}));

export default function Dashboard() {
  const theme: any = useTheme();
  const [page, setPage] = useState(0);

  const DISPLAY: any = {
    0: <Roster />,
    1: <Formation />,
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#111111",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: theme.spacing(4),
          marginRight: theme.spacing(2),
          marginLeft: theme.spacing(2),
        }}
      >
        <Icon sx={{ marginBottom: theme.spacing(6) }}>Logo</Icon>
        <Icon onClick={() => setPage(0)}>Icon</Icon>
        <Icon onClick={() => setPage(1)}>Icon</Icon>
      </Box>
      <Container
        sx={{
          padding: theme.spacing(4),
          backgroundColor: theme.palette.background.default,
        }}
      >
        {DISPLAY[page]}
      </Container>
    </Box>
  );
}
