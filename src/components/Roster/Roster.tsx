import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useAtom } from "jotai";
import Search from "./Search";
import TeamName from "./TeamName";
import { importModalAtom, rosterAtom } from "../../store/atom";

const columns = [
  { field: "col1", headerName: "Player Name" },
  { field: "col2", headerName: "Jersey Number" },
  { field: "col3", headerName: "Position" },
  { field: "col4", headerName: "Height" },
  { field: "col5", headerName: "Weight" },
  { field: "col6", headerName: "Nationality" },
];

export default function Roster() {
  const [roster, _] = useAtom(rosterAtom);
  const [__, setOpenImport] = useAtom(importModalAtom);
  const theme: any = useTheme();

  return (
    <>
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
          borderRadius: theme.spacing(1),
        }}
      >
        <Box
          sx={{
            flex: 3,
            display: "grid",
            height: "calc(100vh - 136px)",
            width: "100%",
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.spacing(1),
            padding: theme.spacing(2),
          }}
        >
          <table style={{ display: "flex", flexDirection: "column" }}>
            <thead>
              <tr style={{ display: "flex", justifyContent: "space-evenly" }}>
                {columns.map((ele) => {
                  return <th scope="col">{ele.headerName}</th>;
                })}
              </tr>
            </thead>
            <tbody
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body1"
                color={theme.palette.text.secondary}
                mb={2}
              >
                You do not have any players on the roster
              </Typography>
              <Button
                color="primary"
                variant="text"
                onClick={() => setOpenImport(true)}
              >
                Import Team
              </Button>
            </tbody>
          </table>
        </Box>
      </Box>
    </>
  );
}
