import React from "react";
import { useAtom } from "jotai";
import { importModalAtom } from "../../store/atom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";

const columns = [
  { field: "col1", headerName: "Player Name" },
  { field: "col2", headerName: "Jersey Number" },
  { field: "col3", headerName: "Position" },
  { field: "col4", headerName: "Height" },
  { field: "col5", headerName: "Weight" },
  { field: "col6", headerName: "Nationality" },
];

export default function EmptyTable() {
  const [__, setOpenImport] = useAtom(importModalAtom);
  const theme: any = useTheme();
  return (
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
        <Typography variant="body1" color={theme.palette.text.secondary} mb={2}>
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
  );
}
