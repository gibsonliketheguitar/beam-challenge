import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Paper } from "@mui/material";
import { Container } from "@mui/system";
import TeamName from "./TeamName";

export default function Formation() {
  const theme: any = useTheme();
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: theme.spacing(3),
          backgroundColor: "none",
        }}
      >
        <TeamName />
      </Box>
      <Box
        sx={{
          flex: 4,
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(4),
          borderRadius: theme.spacing(0.5),
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: theme.spacing(49),
          }}
        >
          <Paper
            sx={{
              flex: 3,
              marginRight: theme.spacing(4),
              borderRadius: theme.spacing(0.5),
            }}
          >
            Formation
          </Paper>
          <Paper sx={{ flex: 2, borderRadius: theme.spacing(0.5) }}>
            PlayerCard
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
