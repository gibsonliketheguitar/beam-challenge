import React, { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useAtom } from "jotai";
import { IconButton, Typography } from "@mui/material";
import ThreeDots from "../../assets/ThreeDots";
import { rosterAtom, searchAtom } from "../../store/atom";

const colHeader = [
  "Player Name",
  "Jersey Number",
  "Starter",
  "Position",
  "Height",
  "Weight",
  "Nationality",
  "Appearances",
  "Minutes Played",
  "",
];

export default function Table() {
  const theme: any = useTheme();
  const [roster, _] = useAtom(rosterAtom);
  const [search, __] = useAtom(searchAtom);
  if (!roster) return <></>;

  function renderColHeader() {
    if (!roster) return <></>;
    const colHead = colHeader.map((col, index) => (
      <th key={index} scope="col" style={{ textAlign: "left" }}>
        <Typography color={theme.palette.text.secondary} variant="h6">
          {col}
        </Typography>
      </th>
    ));
    return <tr>{colHead}</tr>;
  }

  function renderRow() {
    if (!roster) return [];
    return roster
      .filter(
        (player: any) =>
          player["Player Name"].toLowerCase().includes(search) ||
          player["Position"].toLowerCase().includes(search)
      )
      .map((player: any, index: number) => {
        const row = colHeader.map((key) => (
          <td style={{ textAlign: "left", height: theme.spacing(2) }}>
            {key !== "" ? (
              <Typography variant="body1" color={theme.palette.text.secondary}>
                {player[key]}
              </Typography>
            ) : (
              <EditPlayer name={player["Player Name"]} />
            )}
          </td>
        ));
        return <tr key={index}>{row}</tr>;
      });
  }

  return (
    <table
      style={{
        tableLayout: "fixed",
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>{renderColHeader()}</thead>
      <tbody>{renderRow()}</tbody>
    </table>
  );
}

function EditPlayer(name: any) {
  return (
    <>
      <IconButton>
        <ThreeDots />
      </IconButton>
    </>
  );
}
