import React from "react";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { useAtom } from "jotai";

import EmptyTable from "./EmptyTable";
import Search from "./Search";
import Table from "./Table";
import TeamName from "./TeamName";

import { rosterAtom } from "../../store/atom";

export default function Roster() {
  const [roster, _] = useAtom(rosterAtom);
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
          {!roster ? <EmptyTable /> : <Table />}
        </Box>
      </Box>
    </>
  );
}
