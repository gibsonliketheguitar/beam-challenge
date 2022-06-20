import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Paper, styled } from "@mui/material";
import { Container } from "@mui/system";

import IconButton from "../common/IconButton";
import Roster from "./Roster/Roster";
import Formation from "./Formation/Formation";
import RosterIcon from "../assets/RosterIcon";
import FormationIcon from "../assets/FormationIcon";

export default function Dashboard() {
  const theme: any = useTheme();
  const [page, setPage] = useState(0);

  enum Nav {
    Roster = 0,
    Formation = 1,
  }

  const DISPLAY: any = {
    0: <Roster />,
    1: <Formation />,
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
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
        <IconButton
          isSelected={true}
          sx={{
            height: theme.spacing(4),
            width: theme.spacing(4),
            borderRadius: theme.spacing(3),
            marginBottom: theme.spacing(6),
            backgroundColor: theme.palette.primary.main,
          }}
        />
        <IconButton
          isSelected={page === Nav.Roster}
          onClick={() => setPage(Nav.Roster)}
        >
          <RosterIcon />
        </IconButton>
        <IconButton
          isSelected={page === Nav.Formation}
          onClick={() => setPage(Nav.Formation)}
        >
          <FormationIcon />
        </IconButton>
      </Box>
      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(4),
          backgroundColor: theme.palette.background.default,
        }}
      >
        {DISPLAY[page]}
      </Container>
    </Box>
  );
}
