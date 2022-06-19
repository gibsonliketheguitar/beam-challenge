import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Paper } from "@mui/material";
import { Container } from "@mui/system";
import Search from "./Search";
import TeamName from "./TeamName";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "col1", headerName: "Player Name" },
  { field: "col2", headerName: "Jersey Number" },
  { field: "col3", headerName: "Position" },
  { field: "col4", headerName: "Height" },
  { field: "col5", headerName: "Weight" },
  { field: "col6", headerName: "Nationality" },
  { field: "col7", headerName: "Appearances" },
  { field: "col8", headerName: "Minutes Played" },
  { field: "col9", headerName: "" },
];
const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

export default function Roster() {
  const theme: any = useTheme();
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: theme.spacing(3),
          backgroundColor: "none",
        }}
      >
        <TeamName />
        <Search />
      </Box>
      <Box
        sx={{
          flex: 4,
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.spacing(0.5),
        }}
      >
        <Paper
          sx={{
            height: 300,
            width: "100%",
          }}
        >
          <DataGrid rows={rows} columns={columns} />
        </Paper>
      </Box>
    </Container>
  );
}
